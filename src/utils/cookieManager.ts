import Cookies from 'js-cookie'

export const setCookie = (name: string, value: object) => {
  Cookies.set(name, JSON.stringify(value), { expires: 7, secure: true })
}


// // Get a cookie
// export const getCookie = (name) => {
//   return Cookies.get(name)
// }

// // Remove a cookie
// export const removeCookie = (name) => {
//   Cookies.remove(name)
// }
