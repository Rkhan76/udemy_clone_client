import { atom } from 'recoil'

export const isSignedInState = atom<boolean>({
  key: 'isSignedInState', 
  default: false,
})
