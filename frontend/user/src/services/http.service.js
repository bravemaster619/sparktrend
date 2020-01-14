import { config } from '../config'
import  Axios  from 'axios'
import { authHeader } from "../helpers"

export default {
   get: function(url, data, header) {
      return Axios.get(config.base_url(url), data)
   },
   post: function(url, data, header) {
      return Axios.post(config.base_url(url), data, {headers: Object.assign(header,authHeader())})
   },
   put: function(url, data, header) {
      return Axios.put(config.base_url(url), data, {headers: Object.assign(header,authHeader())})
   },
   delete: function(url, data, header) {
      return Axios.put(config.base_url(url), data, {headers: Object.assign(header,authHeader())})
   }
}