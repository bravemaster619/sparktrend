'use strict'
const User = use('App/Models/User')
const Instaaccount = use('App/Models/Instaaccount')
const Order = use('App/Models/Order')
const Transaction = use('App/Models/Transaction')
const BaseController = require('./BaseController')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
const moment = require('moment')
const { $n, $b, $h } = require('../../../Helpers')
const PaymentService = require('../../../Services/Payment/Paypal')
const Env = use('Env')
const fs = require('fs')
const Mail = use('Mail')
const Config = use('Config')

class OrdersController extends BaseController{

  async new({ request, auth, response }) {
    let user = auth.user;
    if (!(user.verified)) {
      return response.validateFailed('unverified_user')
    }
    let orderData = request.only(['insta_id', 'category', 'pricing_idx', 'start_from', 'with_bio', 'caption', 'additional_info'])
    const instaaccount = await Instaaccount.find(orderData.insta_id)
    if (!instaaccount || !instaaccount.allowed || !instaaccount.product) {
      return response.validateFailed('no_such_product')
    }
    if (instaaccount.user_id.toString() === user._id.toString()) {
      return response.validateFailed('cannot_buy_own_product')
    }
    const seller = await instaaccount.user().fetch()
    if (!seller || !seller.verified) {
      return response.validateFailed('no_such_seller')
    }
    const config = await this.getSiteConfig()
    const now = new Date
    try {
      const start_from = new Date(orderData.start_from)
      // order start_from must be at least 2 days later from now
      if (start_from.getTime() - now.getTime()  < config['order']['time_margin']['start_from']) {
        return response.validateFailed('buyer_invalid_start_time')
      }
    } catch(e) {
      return response.validateFailed('buyer_invalid_start_time')
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
    fs.mkdirSync(use('Helpers').publicPath(filePath), {recursive: true})
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
    if (orderData.type === "Single") {
      orderData.posts = orderData.posts.slice(0,1)
    }
    const order = new Order(orderData)

    try {
      order.calcTotalPrice()
      order.seller_name = instaaccount.username
      order.buyer_name = user.name
      order.history = {}
      order.history.created_at = new Date;
      order.verification_code = randomstring.generate(8)
      order.request_expiry = new Date(order.history.created_at.getTime() + config.order.time_margin.accept)
      order.deadline = new Date(order.start_from.getTime() + order.time * 3600 * 1000 + config.order.time_margin.complete)
      order.payment_method = 'paypal'
      await order.save()
    } catch(e) {
      return response.apiFail(e)
    }
    try {
      const config = await this.getSiteConfig()
      let acceptDeadline = config['order']['time_margin']
      acceptDeadline = moment.duration(acceptDeadline).humanize()
      const mailData = {
        order, user, seller, acceptDeadline,
        baseUrl: use('Env').get('FRONTEND_URL'),
      }
      Mail.send('emails.new_order', mailData, (message) => {
        message.to(seller.email, seller.name)
        message.from(Config.get('mail.sender'))
        message.subject('A new order has been requested!')
      })
    } catch(e) {
      console.error(e)
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
      const pageLength = 20
      let page = $n(request.input("page"))
      if (page < 1) {
        page = 1
      }
      const skip = (page - 1) * pageLength
      documentQueryBuilder = documentQueryBuilder.where(whereQuery).skip(skip).limit(pageLength)
      orders = await documentQueryBuilder.fetch()
      total = await countQueryBuilder.count()
      return response.apiCollection(orders, { total })
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
      orders = JSON.parse(JSON.stringify(orders))
      orders.forEach(order => {
        if (order.seller_id.toString() !== user._id.toString()) {
          if(order.instaaccount && order.instaaccount.username) {
            order.instaaccount.username = $h(order.instaaccount.username)
          }
        }
        if(order.buyer_id.toString() !== user._id.toString()) {
          if (order.rating && order.rating.feedback) {
            order.rating.feedback = ''
          }
        }
      })
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
    if (user.role === "admin") {
      const buyer = await instance.buyer().fetch()
      const seller = await instance.seller().fetch()
      const instaaccount = await instance.instaaccount().fetch()
      const order = JSON.parse(JSON.stringify(instance))
      order.buyer = buyer
      order.seller = seller
      order.instaaccount = instaaccount
      if(order.buyer) {
        order.buyer.total_purchase = await Order.where({
          "history.rejected_at": null,
          "history.accepted_at": {$exists: true},
          "buyer_id": buyer._id
        }).count()
      }
      if(order.seller) {
        order.seller.total_sales = await Order.where({
          "history.rejected_at": null,
          "history.accepted_at": {$exists: true}
        }).count()
      }
      return response.apiItem(order)
    } else {
      return response.apiItem(instance)
    }

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
    const perm = await this.checkPermission(order, user, 'accept')
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
    const perm = await this.checkPermission(order, user, 'reject')
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
    const perm = await this.checkPermission(order, user, 'start')
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
    const perm = await this.checkPermission(order, user, 'complete')
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
    const perm = await this.checkPermission(order, user, 'pay')
    const config = await this.getSiteConfig()
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
        let chargeRate = $n(config['charge']['commission'])
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
    const perm = await this.checkPermission(order, user, 'refund')
    if (perm.isAllowed) {
      // TODO: Create refund payment flow
      order.history.refunded_at = new Date
      await order.save()
      return response.apiSuccess(order, {}, 'order_refunded')
    } else {
      return response.validateFailed(perm.reason)
    }
  }

  async rate({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = await this.checkPermission(order, user, 'rate')
    if (perm.isAllowed) {
      let ratingData = request.only(['communication', 'professionalism', 'recommendation'])
      if (request.input("feedback")) {
        ratingData.feedback = request.input('feedback')
      }
      order.rating = ratingData
      order.history.rated_at = new Date
      const instaaccount = await order.instaaccount().first()
      const ratings = instaaccount.ratings ? instaaccount.ratings : {}
      ratingData.created_at = order.history.rated_at
      ratings[order._id] = ratingData
      instaaccount.ratings = ratings
      await instaaccount.save()
      try {
        await order.save()
      } catch(e) {
        console.log(util.inspect(ratingData, false, null, true))
        return response.apiFail(e, 'rating_save_failed')
      }
      return response.apiSuccess(order, {}, 'order_rated')
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



  async checkPermission(order, user, action) {
    if (!(user.verified)) {
      return {
        isAllowed: false,
        reason: 'unverified_user'
      }
    }
    action = action.toLowerCase();
    if (['create', 'accept', 'start', 'complete', 'pay', 'reject', 'refund', 'rate'].includes(action) === false) {
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
      let config = await this.getSiteConfig()
      config = config['order']['time_margin']
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
                reason: 'seller_invalid_start_time'
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
    if (action === "rate") {
      if (ownership === "buyer") {
        if (status.payment !== Order.STATUS.PAYMENT.PAID) {
          return {
            isAllowed: false,
            reason: 'cannot_rate_before_payment'
          }
        }
        if(order.history.rated_at && status.shoutout === Order.STATUS.SHOUTOUT.COMPLETED) {
          return {
            isAllowed: false,
            reason: 'cannot_change_feedback_after_completion'
          }
        }
        return {
          isAllowed: true
        }
      }
      return {
        isAllowed: false,
        reason: 'invalid_ownership'
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
