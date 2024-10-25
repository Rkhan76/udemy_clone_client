import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isSignedInState } from '../../store/atoms/auth'
import { userDetailsState } from '../../store/atoms/user'

export const AvatarDropdown = () => {
  const navigate = useNavigate()
  const setIsSignedIn = useSetRecoilState(isSignedInState)
  const setUserDetails = useSetRecoilState(userDetailsState)

  const handleLogout = () => {
    setIsSignedIn(false)
    setUserDetails(null)
    navigate('/')
  }

  return (
    <div className="absolute right-0  w-48 bg-white border rounded shadow-lg">
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  )
}
