import axios from "axios"
import { StudentSignupProps } from "../types/authType"

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
