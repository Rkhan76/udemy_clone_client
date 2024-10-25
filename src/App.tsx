// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Home from './pages/MainDashboard/HomePage'
import SigninPage from './pages/MainDashboard/SigninPage'
import SignupPage from './pages/MainDashboard/SignupPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

 const GoogleAuthWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
     <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
       {children}
     </GoogleOAuthProvider>
   )
 }


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home/>}/>
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
      </Routes>
    </>
  )
}

export default App
