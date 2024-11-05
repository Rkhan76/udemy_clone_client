import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { Form, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const formSchema = z.object({
  imageUrl: z.instanceof(File).optional(),
})

interface ImageFormProps {
  initialData: {
    imageUrl: string
  }
  courseId: string
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    console.log('imageform render ', Math.random())
    console.log(initialData , "initialData")
  const [isEditing, setIsEditing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData.imageUrl
  )

  useEffect(()=>{
    setPreviewUrl(initialData.imageUrl)
  },[initialData.imageUrl])

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: undefined,
    },
  })

  const { isSubmitting, isValid } = form.formState

  // Handle file input change and generate a preview URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile) // Generate a temporary preview URL
      setPreviewUrl(preview)
    }
  }

  const onSubmit = async () => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    if (file) {
      formData.append('image', file)
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/upload/image/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const newImageUrl = response.data.imageUrl 
      setPreviewUrl(newImageUrl) // Update preview with the new image from backend
      setFile(null)
      toast.success('Course updated', { autoClose: 1000 })
      toggleEdit()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Something went wrong', { autoClose: 1000 })
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : initialData.imageUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
        </Button>
      </div>

     
      {/* Display existing or preview image */}
      {!isEditing ? (
        previewUrl ? (
          <div className="relative aspect-video mt-2">
            <img
              alt="upload"
              className="object-cover rounded-md w-full h-full"
              src={previewUrl}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        )
      ) : (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show preview if a file is selected */}
            {previewUrl && (
              <div className="relative aspect-video mt-2">
                <img
                  alt="preview"
                  className="object-cover rounded-md w-full h-full"
                  src={previewUrl}
                />
              </div>
            )}

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
