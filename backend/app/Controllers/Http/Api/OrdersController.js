'use strict'
const User = use('App/Models/user')
const Instaaccount = use('App/Models/Instaaccount')
const Order = use('App/Models/Order')
const BaseController = require('./BaseController')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
const { $n, $b } = require('../../../Helpers')

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
      orderData.bio_url = request.input('bio_url')
    }
    if (orderData.category === "Story") {
      orderData.swipe_up_url = request.input('swipe_up_url')
    }
    if (!(orderData = this.copyInfoFromProduct(orderData, instaaccount.product))) {
      return response.validateFailed('invalid_product')
    }
    orderData.buyer_id = user._id
    orderData.seller_id = instaaccount.user_id
    orderData.start_from = new Date(orderData.start_from)
    // upload images
    /*const postFiles = (request.file('posts', {
      types: ['image'],
      size: '5mb',
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    }))
    if (!postFiles) {
      return response.validateFailed('empty_posts')
    }
    orderData.posts = []
    const filePath = `uploads/image/posts/${user._id.toString()}`
    postFiles.moveAll(use('Helpers').publicPath(filePath), (post) => {
      let fileName = `${use('uuid').v1().replace(/-/g, '')}_${post.clientName}`
      orderData.posts.push(`${filePath}/${fileName}`)
      return {
        name: fileName
      }
    })*/
    orderData.posts = ['change code when integrate with vuejs']
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
    return response.json(order)
  }

  async index({request, response, auth, decodeQuery}) {
    let user = auth.user
    const orders = []
    if (user.role === "admin") {
      const orders = await Order.query(decodeQuery().query).fetch()
      const total = await Order.query(decodeQuery().countQuery).count()
      return response.apiCollection(orders, { total })
    }
    if (user.role === "user") {
      const orders = await Order
        .query(decodeQuery().query)
        .where({ $or: [{ buyer_id: user._id }, { seller_id: user._id }] })
        .fetch()
      const total = await Order
        .query(decodeQuery().countQuery)
        .where({ $or: [{ buyer_id: user._id }, { seller_id: user._id }] })
        .count()
      return response.apiCollection(orders, { total })
    }
    throw UnAuthorizeException.invoke()
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
    const perm = this.checkPermission(order, user, 'accept')
    if (perm.isAllowed) {
      order.history.accepted_at = new Date
      await order.save()
      return response.apiSuccess('order_accepted', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
    }
  }

  async reject({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'reject')
    if (perm.isAllowed) {
      order.history.rejected_at = new Date
      await order.save()
      return response.apiSuccess('order_rejected', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
    }
  }

  async start({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'start')
    if (perm.isAllowed) {
      order.history.started_at = new Date
      await order.save()
      return response.apiSuccess('order_started', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
    }
  }

  async complete({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'complete')
    if (perm.isAllowed) {
      order.history.completed_at = new Date
      await order.save()
      return response.apiSuccess('order_completed', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
    }
  }

  async pay({ request, response, auth, instance }) {
    let user = auth.user
    const order = instance
    const perm = this.checkPermission(order, user, 'pay')
    if (perm.isAllowed) {
      // TODO: Create payment flow
      order.history.paid_at = new Date
      await order.save()
      return response.apiSuccess('order_paid', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
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
      return response.apiSuccess('order_refunded', order)
    } else {
      throw UnAuthorizeException.invoke(perm.reason)
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

  decideOrderStatus(order) {

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
                  reason: 'rejected_order'
                }
              }
            }
            return { isAllowed: true }
          }
          break;
        case 'start':
          if (status.shoutout === Order.STATUS.SHOUTOUT.ACCEPTED ) {
            const timeDiff = Math.abs(now.getTime() - (new Date(order.start_from)).getTime())
            console.log({timeDiff, config})
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
