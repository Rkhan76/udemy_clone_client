import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage
} from '../ui/form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})


interface TitleFormProps{
    initialData: {
        title: string
    },
    courseId: string
}

export const TitleForm = ({
    initialData,
    courseId,
}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = ()=> setIsEditing((current)=> !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const { isSubmitting,isValid } = form.formState

    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        try{
            console.log(values, "values in courseid")
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
            console.log("response is here : ", response.data.course)
            toast.success("Course updated",{autoClose:1000})
            toggleEdit()
        }catch{
            toast.error('Something went wrong', {autoClose:100})
        }
    }


  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Courese title
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
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
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
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button
                disabled={!isValid || isSubmitting}
                type='submit'
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}


