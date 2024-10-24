// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/MainLayout/Navbar'
import { Footer } from '../components/MainLayout/Footer'

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default MainLayout
     