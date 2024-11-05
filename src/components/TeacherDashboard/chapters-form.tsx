import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, Pencil, PlusCircle } from 'lucide-react'

import { Form, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { ChaptersList } from './ChaptersList'

interface Chapter {
  id: string
  title: string
  description?: string
  videoUrl?: string
  position: number
  isPublished: boolean
  isFree: boolean
}

const formSchema = z.object({
  title: z.string().min(1),
})

interface ChaptersFormProps {
  initialData: {
    title: string
  } & {chapters : Chapter[]},
  courseId: string;
}

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
   const navigate = useNavigate()  
  const location = useLocation()

    const handleRefresh = () => {
      navigate(location.pathname, { replace: true })
    }

  

  const toggleCreating = () => setIsCreating((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("chaptersValue",values)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `http://localhost:5000/api/v1/chapters/${courseId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('response is here : ', response.data)
      toast.success('Chapter created', { autoClose: 1000 })
      toggleCreating()
    } catch {
      toast.error('Something went wrong', { autoClose: 100 })
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)
      const token = localStorage.getItem('token') // Ensure this token is retrieved
      await axios.put(
        `http://localhost:5000/api/v1/chapters/reorder/${courseId}`,
        { list: updateData },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      )
      toast.success('Chapters reordered', { autoClose: 1000 })
      handleRefresh()
    } catch {
      toast.error('Something went wrong', { autoClose: 1000 })
    } finally {
      setIsUpdating(false)
    }
  }

  const onEdit = (id: string)=>{
    let chapterId = id
    console.log(chapterId, "chapter id on chapterform")

    navigate(`/teacher/courses/${courseId}/chapters/${chapterId}`)
  }


  return (
    <div className="relative mt-6 bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className='absolute h-full w-full bg-sky-500/20 top-0 right-0 rounded-md items-center justify-center'>
          <Loader2
          className='animate-spin h-6 w-6 text-sky-700'
          />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
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
                    disabled={isSubmitting}
                    placeholder="e.g. 'Introduction to the course' "
                    {...field}
                   />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
        )}>
           {!initialData.chapters.length && "No chapters"}
           <ChaptersList
            onEdit= {onEdit}
            onReorder = {onReorder}
            items={initialData.chapters || []}
           />
        </div>
      )}
      {!isCreating && (
        <p className='text-xs text-muted-foreground mt-4'>
            Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}
