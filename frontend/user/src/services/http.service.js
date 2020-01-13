import { config } from '../config'
import  Axios  from 'axios'
import { authHeader } from "../helpers"

export default {
   get: function(url, data) {
      return Axios.get(config.base_url(url), data)
   },
   post: function(url, data) {
      return Axios.post(config.base_url(url), data, {headers: authHeader()})
   },
   put: function(url, data) {
      return Axios.put(config.base_url(url), data, {headers: authHeader()})
   },
   delete: function(url, data) {
      return Axios.put(config.base_url(url), data, {headers: authHeader()})
   }
}