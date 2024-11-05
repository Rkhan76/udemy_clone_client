import { useState } from 'react'
import { handleStudentSignin } from '../../services/auth'
import { StudentSigninProps } from '../../types/authType'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../utils/cookieManager'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isSignedInState, isTeacherSignedInState } from '../../store/atoms/auth'
import { userDetailsState } from '../../store/atoms/user'

const useSignin = () => {
  const setIsSignedIn = useSetRecoilState(isSignedInState)
  const setUserDetails = useSetRecoilState(userDetailsState)
  const setIsTeacherSignedIn = useSetRecoilState(isTeacherSignedInState)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignin = async (formData: StudentSigninProps) => {
    setLoading(true)
    setError(null)

    try {
      const response = await handleStudentSignin(formData)

      if (response.success) {
        localStorage.setItem("token", response.user.token)
        setCookie('authToken', response.user.token)
        setCookie('user', {
          id: response.user.id,
          fullname: response.user.fullname,
          email: response.user.email,
          roles: response.user.roles,
        })

        setUserDetails({
          id: response.user.id,
          fullname: response.user.fullname,
          email: response.user.email,
          roles: response.user.roles,
        })
        if (response.user.roles.includes('TEACHER')){
          setIsTeacherSignedIn(true)
        }
        setIsSignedIn(true) 
        navigate('/')
      }

      setLoading(false)
      return response
    } catch (err) {
      setLoading(false)
      setError('Signin failed. Please try again.')
      toast.error('Signin failed.')
      return null
    }
  }

  return { handleSignin, loading, error }
}

export default useSignin
