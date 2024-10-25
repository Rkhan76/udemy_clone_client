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
import { getCookie, isTokenValid } from './utils/cookieManager'
import { useSetRecoilState } from 'recoil'
import { isSignedInState } from './store/atoms/auth'

const GoogleAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
      {children}
    </GoogleOAuthProvider>
  )
}

const App = () => {
  const setIsSignedIn = useSetRecoilState(isSignedInState)

  useEffect(() => {
    const authToken = getCookie('authToken')
    if (authToken) {
      if (isTokenValid(authToken)) {
        setIsSignedIn(true)
      }
    }
  }, [setIsSignedIn])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
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
