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
import { cn } from '../../lib/utils'
import { formatPrice } from '../../lib/format'

const formSchema = z.object({
  price: z.coerce.number(),
})

interface PriceFormProps {
  initialData: {
    price: number
  }
  courseId: string
}

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(initialData.price) // Local state for price

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
      setPrice(response.data.course.price) // Update local price state
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch {
      toast.error('Something went wrong', { autoClose: 100 })
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn('text-sm mt-2', !price && 'text-slate-500 italic')}>
          {price ? formatPrice(price) : 'No price'}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
