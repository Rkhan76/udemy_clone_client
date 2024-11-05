// GoogleAuthContainer.tsx
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SignInWithGoogle } from '../../components/MainLayout/SiginWithGoogle'
import { isSignedInState, isTeacherSignedInState } from '../../store/atoms/auth'
import { handleSigninWithGoogle } from '../../services/auth'
import { setCookie } from '../../utils/cookieManager'
import { userDetailsState } from '../../store/atoms/user'

interface User {
  id: string
  fullname: string
  email: string
  roles: string[]
}

interface GoogleAuthResponse {
  code?: string
  user: User
}

interface GoogleAuthContainerProps {
  onSuccess?: (response: GoogleAuthResponse) => void
  onError?: () => void
}

const GoogleAuthContainer: React.FC<GoogleAuthContainerProps> = ({
  onSuccess,
  onError,
}) => {
  const setUserDetails = useSetRecoilState(userDetailsState)
  const setIsSignedIn = useSetRecoilState(isSignedInState)
  const setIsTeacherSignedIn = useSetRecoilState(isTeacherSignedInState)
  const navigate = useNavigate()

  const handleGoogleSuccess = async (response: GoogleAuthResponse) => {
    try {
      if (response.code) {
        const result = await handleSigninWithGoogle(response.code)

        if (result.user.token) {
          setCookie('authToken', result.user.token)
          setCookie('user', {
            id: result.user.id,
            fullname: result.user.fullname,
            email: result.user.email,
            roles: result.user.roles,
          })
          setUserDetails({
            id: result.user.id,
            fullname: result.user.fullname,
            email: result.user.email,
            roles: result.user.roles,
          })
          if (result.user.roles.includes('TEACHER')) {
            setIsTeacherSignedIn(true)
          }
          setIsSignedIn(true)
          toast.success('Google login successful!', { autoClose: 1000 })
          navigate('/')
          onSuccess?.(response) 
        } else {
          toast.error('Login failed. Please try again.')
          onError?.() 
        }
      } else {
        toast.error('Failed to retrieve authentication code.')
        onError?.() 
      }
    } catch (error) {
      toast.error('Login failed. Please try again.',{ autoClose: 1000})
      console.error('Error during Google login:', error) // Log the error for debugging
      onError?.() 
    }
  }

  const handleGoogleError = () => {
    toast.error('Google login failed. Please try again.')
    onError?.() 
  }

  return (
    <SignInWithGoogle
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  )
}

export default GoogleAuthContainer
