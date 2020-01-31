import httpService from "./http";

export const login = (payload) => {
   return httpService.post('auth/admin-login', payload).then((res) => {
      if (res.data && res.data.status == 200 && res.data.data.user.is_admin) {
         const tokenInfo = res.data.data
         localStorage.setItem('sparktrend-user', JSON.stringify(tokenInfo))
      }
   })
}

export const logout = () => {
   const credential = currentCredential()
   let refreshToken = null
   if (credential && credential.refresh_token) {
      refreshToken = credential.refresh_token
   }
   return httpService.post('auth/logout', {
      refreshToken
   }).finally(() => {
      localStorage.removeItem('sparktrend-user')
   })
}

export const currentCredential = () => {
   const credential =  localStorage.getItem('sparktrend-user')
   try {
      return JSON.parse(credential)
   } catch (e) {
      localStorage.removeItem('sparktrend-user')
   }
   return null
}