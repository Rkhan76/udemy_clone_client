import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL

export const handleFetchCourseById = async (courseId:string) => {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get(`${BASE_URL}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching course by ID:', error)
    throw error
  }
}