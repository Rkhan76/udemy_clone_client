import { Signup } from '../../components/MainLayout/Signup'
import useSignup from '../../hooks/MainLayout/useSignup'
import { toast } from 'react-toastify'

import { useState } from 'react'

const SignupContainer = () => {
  const { handleSignup, loading, error } = useSignup()
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await handleSignup(formData)

    if (result && result.success) {
      toast.success('Signup successful!')
      setFormData({
        fullname: '',
        email: '',
        password: '',
      })
    }
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div>
      <Signup
        onSubmit={handleSubmit}
        errorMessage={error} // Pass the error message to the Signup component
        loading={loading}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  )
}

export default SignupContainer
