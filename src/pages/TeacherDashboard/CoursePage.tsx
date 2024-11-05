import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

const CoursePage = () => {
  return (
    <div className="p-6">
      <Link to="/teacher/course/create">
        <Button>New Course</Button>
      </Link>
    </div>
  )
}

export default CoursePage
