import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import Instagram from '../../assets/instagram.svg'
import Github from '../../assets/github.svg'
import LinkedIn from '../../assets/linkedin.svg'

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <Link to="/" className="mb-4 md:mb-0">
          <img src={Logo} alt="EduVoyage Logo" className="h-10" />
        </Link>

        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <nav className="flex flex-col space-y-1">
            <Link to="/terms-conditions" className="hover:text-gray-400">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/contact-us" className="hover:text-gray-400">
              Contact Us
            </Link>
          </nav>
        </div>

        <div className="flex space-x-4">
          <Link to="/linkedIn" className="hover:opacity-75">
            <img src={LinkedIn} alt="LinkedIn logo" className="h-8" />
          </Link>
          <Link to="/github" className="hover:opacity-75">
            <img src={Github} alt="Github logo" className="h-8" />
          </Link>
          <Link to="/instagram" className="hover:opacity-75">
            <img src={Instagram} alt="Instagram Logo" className="h-8" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
