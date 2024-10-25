import { useState } from 'react'
import { toast } from 'react-toastify'
import useSignin from '../../hooks/MainLayout/useSignin'
import { Signin } from '../../components/MainLayout/Signin'

export const SigninContainer = () => {
  const { handleSignin, loading, error } = useSignin()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await handleSignin(formData)

      if (result?.success) {
        toast.success('Signin successful!', { autoClose: 2000 })
        setFormData({ email: '', password: '' })
      } else {
        toast.error(result?.message || 'Failed to sign in. Please try again.')
      }
    } catch (err) {
      console.error('Signin error:', err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div>
      <Signin
        onSubmit={handleSubmit}
        errorMessage={error}
        loading={loading}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  )
}
