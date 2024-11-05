import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

import { Form, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { cn } from '../../lib/utils'
import { Combobox } from '../ui/combobox'

const formSchema = z.object({
  categoryId: z.string().min(1),
})

interface CategoryFormProps {
  initialData: {
    categoryId: string
  }
  courseId: string
  options: { label: string; value: string }[]
}

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
    },
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
      console.log(response.data)
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch {
      toast.error('Something went wrong', { autoClose: 100 })
    }
  }

  // Watch the selected categoryId field to show the selected label dynamically
  const selectedCategoryId = form.watch('categoryId')
  const selectedOption = options.find(
    (option) => option.value === selectedCategoryId
  )

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !selectedCategoryId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'No category'}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
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
