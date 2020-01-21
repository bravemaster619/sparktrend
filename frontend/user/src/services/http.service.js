import { config } from '../config'
import  Axios  from 'axios'
import { authHeader } from "../helpers"

export default {
   get: function(url, header = {}, absolute = false) {
      url = absolute ? url : config.base_url(url)
      return Axios.get(url, {headers: Object.assign(header,authHeader())})
   },
   post: function(url, data, header = {}, absolute = false) {
      url = absolute ? url : config.base_url(url)
      return Axios.post(url, data, {headers: Object.assign(header,authHeader())})
   },
   put: function(url, data, header = {}, absolute = false) {
      url = absolute ? url : config.base_url(url)
      return Axios.put(url, data, {headers: Object.assign(header,authHeader())})
   },
   delete: function(url, data, header = {}, absolute = false) {
      url = absolute ? url : config.base_url(url)
      return Axios.put(url, data, {headers: Object.assign(header,authHeader())})
   }
}