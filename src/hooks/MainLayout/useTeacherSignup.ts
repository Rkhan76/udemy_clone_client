import { useState } from 'react'
import { toast } from 'react-toastify'
import { handleTeacherSignup } from '../../services/auth'
import { decodedToken, getCookie, setCookie } from '../../utils/cookieManager'
import { UserDetails } from '../../types/userDetail'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userDetailsState } from '../../store/atoms/user'
import { isTeacherSignedInState } from '../../store/atoms/auth'

export const useTeacherSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const setUserDetails = useSetRecoilState(userDetailsState)
  const setIsTeacherSignedIn = useSetRecoilState(isTeacherSignedInState)

  const handleTeacherRegistration = async () => {
    setLoading(true)
    setError(null)

    try {
      const authToken = getCookie('authToken')

      if (!authToken) {
        toast.error('Authentication token is missing. Please sign in again.')
        navigate('/signin')
        return
      }

      const userDecodedToken = decodedToken(authToken)
      const { id } = userDecodedToken as UserDetails

      const response = await handleTeacherSignup(id)

      if (response.success) {
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
        setIsTeacherSignedIn(true) 
        toast.success('Successfully registered as a Teacher', {
          autoClose: 1000,
        })
        navigate('/teacher-dashboard')
      } else {
        throw new Error(
          response.message || 'Registration failed. Please try again.'
        )
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
      toast.error(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, handleTeacherRegistration }
}
