// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home from './pages/MainDashboard/HomePage'
import SigninPage from './pages/MainDashboard/SigninPage'
import SignupPage from './pages/MainDashboard/SignupPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
