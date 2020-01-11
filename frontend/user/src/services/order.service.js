import { config } from '../config'
import Axios from 'axios'

function confirmPayment(order_id, paypal_order_id) {
   return Axios.post( config.base_url(`order/${order_id}/pay`, {
         paypal_order_id
      })
   )
}

module.exports = {
   confirmPayment
}