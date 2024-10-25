import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'


export const setCookie = (name: string, value: object) => {
  Cookies.set(name, JSON.stringify(value), { expires: 7, secure: true })
}

// // Get a cookie
export const getCookie = (name:string) => {
  return Cookies.get(name)
}

export const isTokenValid = (token: string): boolean => {
  if (!token) return false

  try {
    const decodedToken = jwtDecode(token) 
    const currentTime = Date.now() / 1000 

    
    return decodedToken.exp ? decodedToken.exp > currentTime : false 
  } catch (error) {
    console.error('Error decoding token:', error)
    return false
  }
}




// // Remove a cookie
// export const removeCookie = (name) => {
//   Cookies.remove(name)
// }
