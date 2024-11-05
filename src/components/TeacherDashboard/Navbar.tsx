import { useRecoilState } from 'recoil'
import { AvatarButton } from '../MainLayout/AvatarButton'
import { MobileSidebar } from './MobileSidebar'
import { userDetailsState } from '../../store/atoms/user'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const [userDetails] = useRecoilState(userDetailsState)
  const navigation = useNavigate()

  function handleExit(){
    navigation('/')
  }

  return (
    <div className="bg-white p-4 border-b shadow-sm flex items-center justify-between">
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div
          onClick={handleExit}
          className="flex items-center cursor-pointer hover:text-red-500 transition-colors"
        >
          <LogOut className="text-gray-600 hover:text-red-500" size={20} />
          <span className="ml-2 text-gray-600 hover:text-red-500">Exit</span>
        </div>

        {/* <div>
          <AvatarButton userDetails={userDetails} />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
