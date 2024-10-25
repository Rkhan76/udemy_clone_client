import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { UserDetails } from '../../types/userDetail'
import { useState } from 'react';
import { AvatarDropdown } from './AvatarDropdown';

export const AvatarButton = ({ userDetails }: { userDetails: UserDetails | null }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
  const getInitials = (fullname: any) => {
    const names = fullname.split(' ')
    if (names.length > 1) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase()
    }
    return names[0].length > 1
      ? names[0][0].toUpperCase() + names[0][1].toUpperCase()
      : names[0][0].toUpperCase()
  }
  return (
    <div
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <Avatar className="w-10 h-10 border-2 border-gray-300 rounded-full overflow-hidden">
        <AvatarFallback className="flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black rounded-full">
          {userDetails ? getInitials(userDetails.fullname) : '??'}
        </AvatarFallback>
      </Avatar>
      { dropdownVisible && <AvatarDropdown/> }
    </div>
  )
}


