import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ImageIcon, Pencil,File, PlusCircle, Loader2, X } from 'lucide-react'
import { Form, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export type Attachment = {
  id: string
  name: string
  url: string
  courseId: string
  createdAt: Date
  updatedAt: Date
}

const formSchema = z.object({
  url: z.instanceof(File).optional(),
})

interface AttachmentFormProps {
  initialData: {
    attachments: Attachment[]
  }
  courseId: string
}

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  console.log('AttachmentForm render ', Math.random())
  console.log(initialData.attachments, 'initialData')
  const [isEditing, setIsEditing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
 

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
    },
  })

  const { isSubmitting, isValid } = form.formState

  // Handle file input change and generate a preview URL
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const selectedFile = e.target.files?.[0] || null
   setFile(selectedFile) // Set the file state

 }

  const onSubmit = async () => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    if (file) {
      formData.append('attachment', file)
    }

    console.log(formData, "formData")

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/upload/attachments/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(response.data)

      
      setFile(null)
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Something went wrong', { autoClose: 1000 })
    }
  }

  const onDelete = async(id: string)=> {
    try{
        setDeletingId(id)
        await axios.delete(`http://localhost:5000/api/v1/attachments/${id}`)
        toast.success("Attachment deleted", {autoClose: 1000})
    }catch{
      toast.error("Something went wrong")
    }finally{
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={()=> onDelete(attachment.id)} className='ml-auto hover:opacity-75'>
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="url"
              render={() => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="border p-2 rounded"
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
