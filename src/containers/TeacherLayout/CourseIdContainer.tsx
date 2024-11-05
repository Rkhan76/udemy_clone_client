import { useEffect, useState } from 'react'
import { CourseId } from '../../components/TeacherDashboard/CourseId'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handleFetchCourseById } from '../../services/course'
import { handleFetchCategories } from '../../services/category'

interface Chapter {
  id: string
  title: string
  description?: string
  videoUrl?: string
  position: number
  isPublished: boolean
  isFree: boolean
}

export interface RequiredFieldsProps {
  id: string
  title: string
  description: string
  imageUrl: string
  price: string
  categoryId: string
  chapters: Chapter[] 
}

const CourseIdContainer = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<RequiredFieldsProps | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseResponse, categoriesData] = await Promise.all([
          handleFetchCourseById(courseId as string),
          handleFetchCategories(),
        ])

        if (!courseResponse.course) {
          navigate('/teacher/course')
          return
        }

        setCourse(courseResponse.course)
        setCategories(categoriesData)
        console.log('Categories:', categoriesData)
      } catch (error: any) {
        console.error(error)
        navigate('/teacher/course')
        toast.error('Something went wrong', { autoClose: 1000 })
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId, navigate])

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.price,
    course?.categoryId,
    course?.chapters.some(chapter => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <CourseId
      course={course}
      categories={categories}
      completionText={completionText}
    />
  )
}

export default CourseIdContainer
