import { IconBadge } from '../Icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react'
import { TitleForm } from './title-form'
import { DescriptionForm } from './Description-form'
import { ImageForm } from './Image-form'
import { CategoryForm } from './Category-form'
import { PriceForm } from './price-form'
import { AttachmentForm } from './attachment-form'
import { ChaptersForm } from './chapters-form'
import { RequiredFieldsProps } from '../../containers/TeacherLayout/CourseIdContainer'


export const CourseId = ({
  completionText,
  course,
  categories,
}: any) => {
  console.log('render ', Math.random())

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category: any) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListCheck} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
          </div>
          <AttachmentForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  )
}


