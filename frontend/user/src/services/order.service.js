import { config } from '../config'
import Axios from 'axios'

function confirmPayment(order_id, paypal_order_id) {
   return httpService.post(`order/${order_id}/pay`, { paypal_order_id })
}

export const orderService = {
   confirmPayment
}