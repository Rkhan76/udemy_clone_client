import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

import { Form, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
})

interface DescriptionFormProps {
  initialData: {
    description: string
  }
  courseId: string
}

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(initialData.description) // Local state for description
  const navigate = useNavigate()

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData.description },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://localhost:5000/api/v1/course/${courseId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setDescription(response.data.course.description) // Update local description state
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch {
      toast.error('Something went wrong', { autoClose: 100 })
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !description && 'text-slate-500 italic'
          )}
        >
          {description || 'No description'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
