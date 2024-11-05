import { NavLink, useLocation } from 'react-router-dom'
import {
  Layout,
  Compass,
  List,
  ChartNoAxesColumnIncreasing,
} from 'lucide-react'

const guestRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/course',
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]

export const SidebarRoutes = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map(({ icon: Icon, label, href }) => {
        const isActive = location.pathname === href

        return (
          <NavLink
            key={href}
            to={href}
            className={`flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 py-4 transition-all
              hover:text-slate-600 hover:bg-slate-300/20 ${
                isActive ? 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20' : ''
              }`}
          >
            <div className="flex items-center gap-x-2">
              <Icon
                size={22}
                className={`text-slate-500 transition-colors duration-200 ${
                  isActive ? 'text-sky-400' : 'text-slate-500'
                }`} // Change to a brighter color when active
              />
              <span
                className={`transition-colors duration-200 ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-500'
                }`} // Make the font bolder and brighter when active
              >
                {label}
              </span>
            </div>
            <div
              className={`ml-auto border-2 border-sky-700 h-full transition-all ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </NavLink>
        )
      })}
    </div>
  )
}

export default SidebarRoutes
