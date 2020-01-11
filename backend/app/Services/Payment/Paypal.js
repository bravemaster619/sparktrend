const Env = use('Env')
const paypal = require('@paypal/checkout-server-sdk')
const moment = require('moment')

class PaypalPaymentService {

  constructor () {
    this.clientId = Env.get('PAYPAL_CLIENT')
    this.clientSecret = Env.get('PAYPAL_SECRET')
    this.environment = new paypal.core.SandboxEnvironment(this.clientId, this.clientSecret)
    this.client = new paypal.core.PayPalHttpClient(this.environment)
  }

  async createOrder(amount, currency_code = "USD", intent = "CAPTURE") {
    let request = new paypal.orders.OrdersCreateRequest()
    request.requestBody({
      intent,
      purchase_units: [{
        amount: {
          currency_code,
          value: amount
        }
      }]
    })
    let response = await this.client.execute(request)
    return response
  }

  async captureOrder(orderId) {
    let request = new paypal.orders.OrdersCaptureRequest(orderId)
    request.requestBody({})
    let response = await this.client.execute(request)
    return response
  }

  async getOrder(orderId) {
    let request = new paypal.orders.OrdersGetRequest(orderId)
    let response = await this.client.execute(request)
    return response
  }

  async payOut(paypal_email, amount) {
    const paypal = require('paypal-rest-sdk')
    paypal.configure({
      mode: Env.get('PAYPAL_MODE', 'sandbox'),
      client_id: this.clientId,
      client_secret: this.clientSecret
    })
    const sender_batch_id = (new moment()).format("YYYYMMDDHHmmssSSS")
    const payout_info = {
      "sender_batch_header": {
        "sender_batch_id" : sender_batch_id,
        "email_subject": "Congratulations! You have a payment."
      },
      "items": [{
        "recipient_type": "EMAIL",
        "amount": {
          "value": amount,
          "currency": "USD"
        },
        "receiver": paypal_email,
        "note": "Thank you for your cooperation."
      }]
    }

    var promise = new Promise((resolve, reject) => {
      let cb = (err, payout) => {
        if (err) {
          reject(err.response)
        }
        resolve(payout)
      }
      paypal.payout.create(payout_info, 'false', cb)
    })

    // var ss = paypal.payout.create(payout_info, 'false', function(err, payout) {
    //   console.log('sdf')
    //   console.log(err)
    //   console.log(payout)
    // })
    return promise
  }

}

module.exports = PaypalPaymentService
