import Cookies from 'js-cookie'
import {jwtDecode, JwtPayload } from 'jwt-decode'
import { UserDetails } from '../types/userDetail'

//set Cookie
export const setCookie = (name: string, value: object) => {
  Cookies.set(name, JSON.stringify(value), { expires: 7, secure: true })
}

// // Get a cookie
export const getCookie = (name:string) => {
  return Cookies.get(name)
}

// is token valid
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


// decoded token
export const decodedToken = (token: string): UserDetails | null => {
  if (!token) return null 

  try {
    const decodedToken = jwtDecode<JwtPayload>(token)
    return decodedToken as UserDetails
  } catch (error) {
    console.error('Error decoding token:', error)
    return null 
  }
}




// // Remove a cookie
export const clearCookie = (cookieName: string) => {
  Cookies.remove(cookieName)
  console.log(`Cookie ${cookieName} has been removed.`)
}

//clear all cookie
export const clearAllCookies = () => {
  const allCookies = Cookies.get()

  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName)
  })

  console.log('All cookies have been cleared.')
}
