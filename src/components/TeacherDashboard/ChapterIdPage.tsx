import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import { IconBadge } from '../Icon-badge'
import { ChapterTitleForm } from './ChapterForms/chapter-title-form'

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

const ChapterIdPage = () => {
  const { courseId, chapterId } = useParams()
  const [chapter, setChapter] = useState<Chapter>()
  console.log(chapterId, "chapterid")
  console.log(courseId, "course id")

  useEffect(() => {
   const handleFetchChapterDetail = async () => {
     try {
       const token = localStorage.getItem('token') // Retrieve token from local storage

       const response = await axios.get(
         `http://localhost:5000/api/v1/chapters/${courseId}/${chapterId}`,
         {
           headers: {
             Authorization: `Bearer ${token}`, // Add token to Authorization header
           },
         }
       )

       if (response.data) {
         setChapter(response.data.chapter)
       }
     } catch (err) {
       console.error('Error fetching chapter details:', err) // Log error for debugging
     }
   }


    handleFetchChapterDetail()
  }, [courseId, chapterId])

  const requiredFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `${completedFields}/${totalFields}`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            to={`/teacher/course/create/${courseId}`} // Fixed courseId in the link
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>
                    Chapter Creation
                </h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields {completionText}
                </span>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div className="space-y-4">
            <div>
                <div className='flex items-center gap-x-2'>
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className='text-xl '>
                        Customise your chapter
                    </h2>   
                </div>
                <ChapterTitleForm
                    initialData={chapter}
                    courseId={courseId}
                    chapterId={chapterId}
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage
