// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './pages/MainDashboard/HomePage'
import SigninPage from './pages/MainDashboard/SigninPage'
import SignupPage from './pages/MainDashboard/SignupPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { decodedToken, getCookie, isTokenValid } from './utils/cookieManager'
import { useSetRecoilState } from 'recoil'
import { isSignedInState, isTeacherSignedInState } from './store/atoms/auth'
import { userDetailsState } from './store/atoms/user'
import TeacherSignupPage from './pages/TeacherDashboard/TeacherSignupPage'
import TeacherLayout from './layouts/TeacherLayout'
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard'
import CoursePage from './pages/TeacherDashboard/CoursePage'
import CreateCourse from './components/TeacherDashboard/CreateCourse'
import CourseIdCreate from './components/TeacherDashboard/CourseIdCreate'
import CourseId from './components/TeacherDashboard/CourseId'
import CourseIdPage from './pages/TeacherDashboard/CourseIdPage'
import ChapterIdPage from './components/TeacherDashboard/ChapterIdPage'

const GoogleAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
      {children}
    </GoogleOAuthProvider>
  )
}

const App = () => {
  const setIsSignedIn = useSetRecoilState(isSignedInState)
  const setUserDetails = useSetRecoilState(userDetailsState)
  const setIsTeacherSignedIn = useSetRecoilState(isTeacherSignedInState)

  useEffect(() => {
    const authToken = getCookie('authToken')
    if (authToken) {
      if (isTokenValid(authToken)) {
        const userDecodedToken = decodedToken(authToken)
        setIsSignedIn(true)

        const isTeacher = userDecodedToken?.roles.includes('TEACHER')

        if (isTeacher) {
          setIsTeacherSignedIn(true)
        }

        if (userDecodedToken) {
          setUserDetails(userDecodedToken)
        } else {
          setUserDetails(null)
        }
      }
    }
  }, [setIsSignedIn, setUserDetails, setIsTeacherSignedIn])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/teacher-signup" element={<TeacherSignupPage />} />
          <Route
            path="/signin"
            element={
              <GoogleAuthWrapper>
                <SigninPage />
              </GoogleAuthWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <GoogleAuthWrapper>
                <SignupPage />
              </GoogleAuthWrapper>
            }
          />
        </Route>
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/course" element={<CoursePage />} />
          <Route path="/teacher/course/create" element={<CreateCourse />} />
          <Route
            path="/teacher/course/create/:courseId"
            element={<CourseIdPage/>}
          />
          <Route path="/teacher/courses/:courseId/chapters/:chapterId" element={<ChapterIdPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
