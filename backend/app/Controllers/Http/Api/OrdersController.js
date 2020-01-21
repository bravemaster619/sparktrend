'use strict'
const User = use('App/Models/user')
const Instaaccount = use('App/Models/Instaaccount')
const Order = use('App/Models/Order')
const Transaction = use('App/Models/Transaction')
const BaseController = require('./BaseController')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
const { $n, $b } = require('../../../Helpers')
const PaymentService = require('../../../Services/Payment/Paypal')
const Env = use('Env')
class OrdersController extends BaseController{

  async new({ request, auth, response }) {
    let user = auth.user;
    if (!(user.verified)) {
      throw UnAuthorizeException.invoke('unverified_user')
    }
    let orderData = request.only(['insta_id', 'category', 'pricing_idx', 'start_from', 'with_bio', 'caption', 'additional_info'])
    const instaaccount = await Instaaccount.find(orderData.insta_id)
    if (!instaaccount || !instaaccount.allowed || !instaaccount.product) {
      return response.validateFailed('no_such_product')
    }
    if (instaaccount.user_id.toString() === user._id.toString()) {
      throw UnAuthorizeException.invoke('cannot_buy_own_product')
    }
    try {
      const start_from = new Date(orderData.start_from)
      const now = new Date
      // order start_from must be at least 2 days later from now
      if (start_from.getTime() - now.getTime()  < this.getSiteConfig()['order']['time_margin']['start_from']) {
        return response.validateFailed('invalid_start_time')
      }
    } catch(e) {
      return response.validateFailed('invalid_start_time')
    }
    orderData.with_bio = $b(orderData.with_bio)
    orderData.pricing_idx = $n(orderData.pricing_idx)
    orderData.insta_id = instaaccount._id
    if (orderData.with_bio) {
      orderData.bio_url = request.input('bio_url') ? request.input("bio_url") : ""
    }
    if (orderData.category === "Story") {
      orderData.swipe_up_url = request.input('swipe_up_url') ? request.input('swipe_up_url') : ""
    }
    if (!(orderData = this.copyInfoFromProduct(orderData, instaaccount.product))) {
      return response.validateFailed('invalid_product')
    }
    orderData.buyer_id = user._id
    orderData.seller_id = instaaccount.user_id
    orderData.start_from = new Date(orderData.start_from)
    // upload images
    const postFiles = (request.file('posts', {
      types: ['image', 'video'],
      size: '5mb',
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg', 'mp4', 'gif']
    }))
    if (!postFiles) {
      return response.validateFailed('empty_posts')
    }
    orderData.posts = []
    const filePath = `uploads/image/posts/${user._id.toString()}`
    postFiles.moveAll(use('Helpers').publicPath(filePath), (post) => {
      let fileName = `${use('uuid').v1().replace(/-/g, '')}_${post.clientName}`
      orderData.posts.push({
        filename: post.clientName,
        type: post.type,
        path: `${Env.get('APP_URL')}/${filePath}/${fileName}`
      })
      return {
        name: fileName
      }
    })
    // orderData.posts = ['change code when integrate with vuejs']
    if (orderData.type === "Single") {
      orderData.posts = orderData.posts.slice(0,1)
    }
    const order = new Order(orderData)
    try {
      order.calcTotalPrice()
      order.history = {}
      order.history.created_at = new Date;
      order.verification_code = randomstring.generate(8)
      order.payment_method = 'paypal'
      await order.save()
    } catch(e) {
      return response.apiFail(e)
    }
    return response.apiItem(order)
  }

  async index({request, response, auth, decodeQuery}) {
    const orderType = request.input("type")

    let user = auth.user
    let orders = []
    let total = 0
    let documentQueryBuilder = Order.query(decodeQuery().query).with('instaaccount').sort({"_id": -1})
    let countQueryBuilder = Order.query(decodeQuery().countQuery)
    let whereQuery = {}
    if (user.role === "admin") {
      // TODO: add some query to whereQuery
    } else if (user.role === "user") {
      whereQuery = { $or: [{ buyer_id: user._id }, { seller_id: user._id }] }
      switch(orderType) {
        case 'purchase':
          whereQuery = { buyer_id: user._id }
          break
        case 'sales':
          whereQuery = { seller_id: user._id }
          break
        default: break
      }
      orders = await documentQueryBuilder.where(whereQuery).fetch()
      total = await countQueryBuilder.where(whereQuery).count()
      return response.apiCollection(orders, { total })
    } else {
      throw UnAuthorizeException.invoke()
    }
  }

  async show({ request, response, auth, instance }) {
    let user = auth.user
    if (user.role !== "admin" && user._id.toString() !== instance.buyer_id.toString() && user._id.toString() !== instance.seller_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    return response.apiItem(instance)
  }

  async accept({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    let sellerAccount = null
    try {
      sellerAccount = await order.instaaccount().fetch()
    } catch (e) {
      console.log(e)
      return response.validateFailed('account_empty')
    }
    const perm = this.checkPermission(order, user, 'accept')
    if (perm.isAllowed) {
      order.history.accepted_at = new Date
      sellerAccount.total_shoutout = $n(sellerAccount.total_shoutout) + 1
      await sellerAccount.save()
      await order.save()
      return response.apiSuccess(order, {}, 'order_accepted')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async reject({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'reject')
    if (perm.isAllowed) {
      order.history.rejected_at = new Date
      await order.save()
      return response.apiSuccess(order, {}, 'order_rejected')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async start({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'start')
    if (perm.isAllowed) {
      order.history.started_at = new Date
      await order.save()
      return response.apiSuccess(order, {}, 'order_started')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async complete({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'complete')
    let sellerAccount = null
    try {
      sellerAccount = await order.instaaccount().fetch()
    } catch (e) {
      console.log(e)
      return response.validateFailed('account_empty')
    }
    if (perm.isAllowed) {
      order.history.completed_at = new Date
      sellerAccount.completed_shoutout = $n(sellerAccount.completed_shoutout) + 1
      await order.save()
      await sellerAccount.save()
      return response.apiSuccess(order, {}, 'order_completed')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async pay({ request, response, auth, instance }) {
    if (!(request.input("paypal_order_id"))) {
      throw api.validateFailed("empty_paypal_order_id")
    }
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'pay')
    if (perm.isAllowed) {
      const paypal_order_id = request.input("paypal_order_id")
      const paymentService = new PaymentService();
      let orderInfo = null;
      try {
        orderInfo = await paymentService.getOrder(paypal_order_id)
      } catch (e) {
        console.log(e)
        return response.apiFail('paypal_error')
      }
      if (orderInfo.error) {
        console.log(orderInfo.error)
        return response.apiFail('paypal_error')
      }
      if ($n(orderInfo.result.purchase_units[0].amount.value) != $n(instance.total)) {
        return response.validateFailed('paid_amount_mismatch')
      }
      let transaction = new Transaction(orderInfo.result)
      try {
        await transaction.save()
      } catch(e) {
        console.log(e)
        console.warn('transaction save failed')
      }
      try {
        let seller = await order.seller().fetch()
        let chargeRate = $n(this.getSiteConfig()['charge']['commission'])
        let payoutAmount = ($n(order.subtotal) * $n(1 - chargeRate / 100)).toFixed(2)
        orderInfo = await paymentService.payOut(seller.paypal_email, payoutAmount)
        transaction = new Transaction(orderInfo)
        transaction.charge_rate = chargeRate
        transaction.payout_amount = payoutAmount
        transaction.sender = seller.paypal_email
        console.log(transaction)
        await transaction.save()
      } catch (e) {
        console.log(e)
      }

      order.history.paid_at = new Date
      await order.save()
      return response.apiSuccess(order, {}, 'order_paid')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async refund({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'refund')
    if (perm.isAllowed) {
      // TODO: Create refund payment flow
      order.history.refunded_at = new Date
      await order.save()
      return response.apiSuccess(order, {}, 'order_refunded')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async delete({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    if (user.role !== 'admin') {
      throw UnAuthorizeException.invoke()
    }
    await order.delete()
    return response.apiDeleted()
  }

  // async getPayPalOrderInfo(paypalOrderID) {
  //   const request = require('request-promise')
  //   const base64 = require('base-64')
  //   const PAYPAL_CLIENT = Env.get('PAYPAL_CLIENT')
  //   const PAYPAL_SECRET = Env.get('PAYPAL_SECRET')
  //   const PAYPAL_OAUTH_API = Env.get('PAYPAL_OAUTH_API', 'https://api.sandbox.paypal.com/v1/oauth2/token/')
  //   const PAYPAL_ORDER_API = Env.get('PAYPAL_ORDER_API', 'https://api.sandbox.paypal.com/v2/checkout/orders/')
  //   // 1c. Get an access token from the PayPal API
  //   const basicAuth = base64.encode(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`)
  //   const auth = await request({
  //     method: 'POST',
  //     url: PAYPAL_OAUTH_API,
  //     headers: {
  //       "Accept": 'application/json',
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorziaton": `Basic ${ basicAuth }`
  //     },
  //     form: {
  //       grant_type: 'client_credentials'
  //     },
  //   })
  //   // Call paypal api to get the transaction details
  //   const orderDetails = await request.get(PAYPAL_ORDER_API + paypalOrderID, {
  //     headers: {
  //       Accept:        `application/json`,
  //       Authorization: `Bearer ${ auth.access_token }`
  //     }
  //   })
  //   return orderDetails
  // }

  copyInfoFromProduct(order, product) {
    let pricing = null;
    product.categories.forEach((c) => {
      if (c.type === order.category) {
        pricing = c.pricing
      }
    })
    if (!pricing) {
      return null;
    }
    const productclass = pricing[order.pricing_idx]
    if (!productclass) {
      return null;
    }
    order.time = productclass.time;
    order.price = productclass.price;
    order.bio_price = productclass.bio_price;
    return order;
  }



  checkPermission(order, user, action) {
    if (!(user.verified)) {
      return {
        isAllowed: false,
        reason: 'unverified_user'
      }
    }
    action = action.toLowerCase();
    if (['create', 'accept', 'start', 'complete', 'pay', 'reject', 'refund'].includes(action) === false) {
      return {
        isAllowed: false,
        reason: 'unknown_action'
      }
    }
    let ownership = order.relationship(user)
    if (!(['buyer', 'seller'].includes(ownership))) {
      return {
        isAllowed: false,
        reason: 'no_ownership'
      }
    }
    const status = order.getStatus()
    console.log(status)
    if (status.shoutout < Order.STATUS.SHOUTOUT.CREATED) {
      return {
        isAllowed: false,
        reason: 'rejected_order'
      }
    }
    // begin shoutout actions
    if (['accept', 'start', 'complete', 'reject'].includes(action)) {
      let config = this.getSiteConfig()['order']['time_margin']
      if (ownership !== 'seller') {
        return {
          isAllowed: false,
          reason: 'invalid_ownership'
        }
      }
      const now = new Date;
      switch(action) {
        case 'accept':
        case 'reject':
          if (status.shoutout < Order.STATUS.SHOUTOUT.ACCEPTED) {
            const timeDiff = now.getTime() - (new Date(order.history.created_at)).getTime()
            if (timeDiff > config.accept) {
              console.warn(`Order: ${order._id.toString()} is expired but not marked as expired`)
              console.log(order)
              if (action === 'accept') {
                return {
                  isAllowed: false,
                  reason: 'expired_order'
                }
              }
            }
            return { isAllowed: true }
          }
          break;
        case 'start':
          if (status.shoutout === Order.STATUS.SHOUTOUT.ACCEPTED ) {
            const timeDiff = Math.abs(now.getTime() - (new Date(order.start_from)).getTime())
            if (timeDiff > config.start_time) {
              return {
                isAllowed: false,
                reason: 'invalid_start_time'
              }
            }
            return { isAllowed: true }
          }
          break;
        case 'complete':
          if (status.shoutout === Order.STATUS.SHOUTOUT.STARTED) {
            const timeDiff = now.getTime() - (new Date(order.start_from)).getTime() - order.time * 3600 * 1000
            if (timeDiff < 0) {
              return {
                isAllowed: false,
                reason: 'cannot_complete_before_time'
              }
            }
            return { isAllowed: true }
          }
          break;
        default:
          break;
      }
      return {
        isAllowed: false,
        reason: 'invalid_action'
      }
    }
    // end shoutout actions
    if (action === "pay") {
      if (ownership === "buyer") {
        if (status.payment !== Order.STATUS.PAYMENT.NOT_PAID) {
          return {
            isAllowed: false,
            reason: 'already_paid'
          }
        }
        return {
          isAllowed: true,
        }
      } else {
        return {
          isAllowed: false,
          reason: 'invalid_ownership'
        }
      }
    }
    if (action === "refund") {
      if (status.payment !== Order.STATUS.PAYMENT.PAID) {
        return {
          isAllowed: false,
          reason: 'not_paid_yet'
        }
      }
      if (ownership === "seller") {
        return {
          isAllowed: true
        }
      } else {
        return {
          isAllowed: false,
          reason: 'invalid_ownership'
        }
      }
    }
    return {
      isAllowed: false,
      reason: 'unknown_reason'
    }
  }
}

module.exports = OrdersController
