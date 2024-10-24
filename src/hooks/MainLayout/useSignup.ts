import { useState } from 'react'
import { handleStudentSignup } from '../../services/auth'
import { StudentSignupProps } from '../../types/authType'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useSignup = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (formData: StudentSignupProps) => {
    setLoading(true)
    setError(null)

    try {
      const response = await handleStudentSignup(formData)

      if(response.success) navigate('/signin')
      
      setLoading(false)
      return response

    } catch (err) {
      setLoading(false)
      setError('Signup failed. Please try again.')
      toast.error('Signup failed.') 
      return null
    }
  }

  return { handleSignup, loading, error }
}

export default useSignup
