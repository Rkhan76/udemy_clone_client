import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, Router, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { 
    Form,
    FormField,
    FormControl,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem
 } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { getCookie } from "../../utils/cookieManager"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const CreateCourse = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: '',
      },
    })

    const {isSubmitting, isValid } = form.formState
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // const token = getCookie('authToken')
      const token = localStorage.getItem("token")

      try {
        const response = await axios.post(
          'http://localhost:5000/api/v1/course/create',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data, " data is here")
        navigate(`/teacher/course/create/${response.data.course.id}`)
        toast.success("Course created", {autoClose:1000})
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong', { autoClose: 1000 })
      }
    }


  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link to="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse
