import Axios from 'axios'
import config from '../config'

export const baseUrl = function(url) {
   return config.API_HOST +  (url.startsWith('/') ? url : `/${url}`)
}

export const authHeader = function() {
   let user = JSON.parse(localStorage.getItem("sparktrend-user"));
   if(user && user.token){
      return {
         'Authorization' : 'Bearer ' + user.token
      }
   }else{
      return {}
   }
}

export default {
   get: (url, header = {}, absolute=false) => {
      url = absolute ? url : baseUrl(url)
      return Axios.get(url,  { headers: Object.assign(header, authHeader()) })
   },
   post: (url, data, header = {}, absolute=false) => {
      url = absolute ? url : baseUrl(url)
      return Axios.post(url, data, {headers: Object.assign(header,authHeader())})
   },
   put: (url, data, header = {}, absolute = false) => {
      url = absolute ? url : baseUrl(url)
      return Axios.put(url, data, {headers: Object.assign(header,authHeader())})
   },
   delete: (url, data, header = {}, absolute=false) => {
      url = absolute ? url : baseUrl(url)
      return Axios.post(url, data, {headers: Object.assign(header,authHeader())})
   }

}