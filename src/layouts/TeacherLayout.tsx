import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/TeacherDashboard/Navbar'
import { Sidebar } from '../components/TeacherDashboard/Sidebar'

const TeacherLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-20 md:pl-56 fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="flex-1 md:pl-56 mt-20 h-full">
        <Outlet />
      </main>
    </div>
  )
}

export default TeacherLayout
