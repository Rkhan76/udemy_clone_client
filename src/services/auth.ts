import axios from "axios"
import { StudentSigninProps, StudentSignupProps } from "../types/authType"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const handleStudentSignup = async ({ fullname, email, password }:StudentSignupProps) => {
    console.log(fullname, email, password)
    console.log(BASE_URL, "BASEUR:")
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/signup`,
      {
        fullname,
        email,
        password,
      }
    )

    if (response.data.success) {
      return response.data
    }

    return null
  } catch (error) {
    throw new Error('Signup failed. Please try again.')
  }
}

export const handleStudentSignin = async ({ email, password }: StudentSigninProps) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, {
      email,
      password,
    })

    if (response.data.success) {
      return response.data
    }

    return null
  } catch (error) {
    throw new Error('Signin failed. Please try again.')
  }
}

export const handleSigninWithGoogle = async (code: string) => {
  console.log("code is here : ", code)
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/google-login?code=${code}`
    )

    if (response.data.success === true) {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error)
    throw error
  }
}
