import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Pencil } from 'lucide-react'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '../../ui/form'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const formSchema = z.object({
  title: z.string().min(1),
})

type Chapter = {
  id: string
  title: string
  description?: string
  videoUrl?: string
  position: number
  isPublished: boolean
  isFree: boolean
  muxData?: MuxData
  courseId: string
  createdAt: Date
  updatedAt: Date
}

type MuxData = {
  id: string
  assetId: string
  playbackId?: string
  chapterId: string
}

interface ChapterTitleFormProps {
  initialData: Chapter | undefined
  courseId: string | undefined
  chapterId: string | undefined
}

export const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: initialData?.title || '' },
  })

  const { reset } = form
  const { isSubmitting, isValid } = form.formState

  // Reset form values to initialData when toggling to edit mode
  useEffect(() => {
    if (isEditing && initialData) {
      reset({ title: initialData.title })
    }
  }, [isEditing, initialData, reset])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://localhost:5000/api/v1/chapters/${courseId}/${chapterId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch {
      toast.error('Something went wrong', { autoClose: 100 })
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData?.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
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
