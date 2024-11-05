import axios from 'axios'

const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:5000/api/v1'

export const handleFetchCategories = async () => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:5000/api/v1/categories`,
      config
    )
    console.log('Fetched categories:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}
