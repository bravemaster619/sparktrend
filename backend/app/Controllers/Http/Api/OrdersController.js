'use strict'
const User = use('App/Models/user')
const Instaaccount = use('App/Models/Instaaccount')
const Order = use('App/Models/Order')
const BaseController = require('./BaseController')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
const { $n } = require('../../../Helpers')
class OrdersController extends BaseController{

  async new({ request, auth, response }) {
    // let user = auth.user;
    let user = await User.first()
    let orderData = request.only(['insta_id', 'category', 'pricing_idx', 'start_from', 'with_bio', 'caption', 'additional_info'])
    const instaaccount = await Instaaccount.find(orderData.insta_id)
    if (!instaaccount || !instaaccount.allowed || !instaaccount.product) {
      return response.validateFailed('no_such_product')
    }
    if (instaaccount.user_id.toString() === user._id.toString()) {
      throw UnAuthorizeException.invoke('cannot_buy_own_product')
    }
    orderData.with_bio = orderData.with_bio === true || orderData.with_bio === "true"
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
      console.log(order)
      await order.save()
    } catch(e) {
      return response.apiFail(e)
    }
    return response.json(order)
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
}

module.exports = OrdersController
