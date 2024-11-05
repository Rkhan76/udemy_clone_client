import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'

const formSchema = z.object({
  attachment: z.instanceof(File).refine((file) => file.size > 0, {
    message: 'File is required',
  }),
})

type AttachmentUploadProps = {
  courseId: string
}

const AttachmentUpload: React.FC<AttachmentUploadProps> = ({ courseId }) => {
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachment: null,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile))
      form.setValue('attachment', selectedFile) // Set the file in form state
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('attachment', data.attachment)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://localhost:5000/api/v1/upload/attachment/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Attachment uploaded successfully!', { autoClose: 1000 })
      setFilePreview(null) // Reset preview after successful upload
      form.reset() // Reset the form after submission
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload attachment', { autoClose: 1000 })
    }
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <h2 className="font-medium">Upload Attachment</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <input
            type="file"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          {filePreview && (
            <div className="mt-2">
              <p className="text-sm text-slate-600">Selected file:</p>
              <p>{filePreview}</p>
              {filePreview.endsWith('.jpg') || filePreview.endsWith('.png') ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              ) : (
                <p className="text-sm text-slate-600">{filePreview}</p>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </div>
  )
}

export default AttachmentUpload
