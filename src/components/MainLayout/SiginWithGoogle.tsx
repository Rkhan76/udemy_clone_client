// SignInWithGoogle.tsx
import { Button } from '../ui/button'
import GoogleLogo from '../../assets/google.svg'
import { useGoogleLogin } from '@react-oauth/google'

interface SignInWithGoogleProps {
  onSuccess: (response: any) => void
  onError: () => void
}

export const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({
  onSuccess,
  onError,
}) => {
  const login = useGoogleLogin({
    onSuccess,
    onError,
    flow: 'auth-code',
  })

  return (
    <Button
      onClick={login}
      className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
    >
      <img src={GoogleLogo} alt="Google logo" className="mr-2 w-5 h-5" />
      <span className="text-gray-800">Continue With Google</span>
    </Button>
  )
}
