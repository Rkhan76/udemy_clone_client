import { NavLink, Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'


export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow mb-4">
      <Link to="/">
        <img src={Logo} alt="EduVoyage Logo" className="h-10" />
      </Link>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/plans-pricing"
          className={({ isActive }) =>
            isActive ? 'font-bold lg:block' : 'hidden lg:block'
          }
        >
          Plans & Pricing
        </NavLink>

        <NavLink
          to="/teach"
          className={({ isActive }) =>
            isActive ? 'font-bold' : 'hidden lg:block'
          }
        >
          Teach on EduVoyage
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'font-bold' : '')}
        >
          <ShoppingCart className="w-6 h-6" />
        </NavLink>
        <div className="flex items-center space-x-2 hidden lg:block">
          <Button
            variant={'outline'}
            size={'custom'}
            className="rounded-none"
            asChild
          >
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button
            size={'custom'}
            className="rounded-none hover:text-white"
            asChild
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
