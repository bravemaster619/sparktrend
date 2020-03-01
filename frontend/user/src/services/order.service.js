import { config } from '../config'
import httpService from './http.service'

function confirmPayment(orderId, paypalOrderId) {
   return httpService.post(`orders/${orderId}/pay`, { paypal_order_id: paypalOrderId })
}

export default {
   confirmPayment
}