import UploadForm from '../../components/TeacherDashboard/SampleButton'
import AttachmentUpload from '../../components/TeacherDashboard/SampleButton'
import ImageUpload from '../../components/TeacherDashboard/SampleButton'
import ImageUploadForm from "../../components/TeacherDashboard/SampleButton"




const HomePage = () => {
const courseId = '665c0b34-b003-4d00-83a0-d0babc414acc' // Example course ID

const handleUploadSuccess = (data: any) => {
  console.log('Upload successful:', data)
  // Handle any post-upload logic, such as refreshing the course data
}

return (
  <div>
    <h1>Upload Course Image</h1>
    <AttachmentUpload courseId={courseId}/>
  </div>
)

}

export default HomePage
