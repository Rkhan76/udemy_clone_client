import {atom} from 'recoil'
import { UserDetails } from '../../types/userDetail'

export const userDetailsState = atom<UserDetails | null>({
  key: 'userDetailsState',
  default: null,
})
