import { atom } from 'recoil'

export const isSignedInState = atom<boolean>({
  key: 'isSignedInState', 
  default: false,
})

export const isTeacherSignedInState = atom<boolean>({
  key: 'isTeacherSignedInState',
  default: false
})
