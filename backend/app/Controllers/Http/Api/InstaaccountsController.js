'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Instaaccount')} */
const Instaaccount = use('App/Models/Instaaccount')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
/**
 *
 * @class InstaaccountsController
 */
class InstaaccountsController extends BaseController {

  /**
   * Index
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, decodeQuery }) {
    const instaaccounts = await Instaaccount.query(decodeQuery()).where({allowed: true}).fetch()
    return response.apiCollection(instaaccounts)
  }

  /**
   * Show
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request, instance, response }) {
    const instaaccount = instance
    return response.apiItem(instaaccount)
  }

  async create({ request, auth, response}) {
    const user = auth.user;
    const username = request.input('username')
    // check if an account already registered with given username
    const verfiedAccountExists =  await Instaaccount.where({verified: true}).where({username}).count()
    if (verfiedAccountExists) {
      return response.validateFailed('instagram_already_exists')
    }
    let appliedAccountExists = await Instaaccount.where({username: username})
      .where({user_id: user._id})
      .count()
    if (appliedAccountExists) {
      return response.validateFailed('instagram_already_exists')
    }
    const instaaccount = new Instaaccount({
      user_id: user._id,
      username,
      verified: false,
      verification_code: randomstring.generate(7)
    })
    await instaaccount.save()
    return response.apiCreated(instaaccount)
  }

  async registerInstagram({ request, auth, instance, response }) {
    const user = auth.user
    let instaaccount = instance

    if (user.role != 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    const instainfo = await this.getInstaInfo(instaaccount.username)
    if (instaaccount.verified && instainfo.follower_count) {

    } else {
      if (!instainfo) {
        return response.validateFailed('no_such_account')
      }
      if (instainfo.follower_count < 10000) {
        return response.validateFailed('insufficient_followers')
      }
      if (!instaaccount.verfication_code) {
        instaaccount.verification_code = randomstring.generate(7)
      }
    }
    if (instainfo) {
      instaaccount.follower_count = instainfo.follower_count
      instaaccount.profile_img = instainfo.profile_img
      instaaccount.type = instainfo.type
    }
    await instaaccount.save()
    instaaccount.merge(instainfo)
    return response.apiUpdated(instaaccount)
  }

  async validateInstagram({ request, auth, response, instance }) {
    const user = auth.user
    let instaaccount = instance

    if (user.role != 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    const isValid = await this.validateInsta(instaaccount.username, instaaccount.verification_code)
    if (isValid) {
      instaaccount.verified = true
      await instaaccount.save()
      return response.apiUpdated(instaaccount)
    } else {
      return response.validateFailed('insta_verification_failed')
    }
  }

  async uploadInsights({ request, auth, instance, response }) {
    const user = auth.user
    let instaaccount = instance

    if (user.role !== 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    const image = request.file('image', {
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    const fileName = `${use('uuid').v1().replace(/-/g, '')}_${image.clientName}`
    const filePath = `uploads/image/insights/${instaaccount._id.toString()}`
    await image.move(use('Helpers').publicPath(filePath), { name: fileName })
    instaaccount.insights_picture = `${filePath}/${fileName}`
    await instaaccount.save()
    return response.apiUpdated(instaaccount)
  }

  async adminEdit({ request, auth, instance, response }) {
    const user = auth.user
    if (user.role !== 'admin') {
      throw UnAuthorizeException.invoke()
    }
    let instaaccount = instance
    const editData = request.only(['demographics', 'allowed', 'verified'])
    instaaccount.merge(editData)
    try {
      await instaaccount.save()
    } catch(e) {
      return response.validateFailed('invalid_data')
    }

    return response.apiUpdated(instaaccount)
  }

  async storeProduct({ request, auth, instance, response }) {
    const user = auth.user
    let instaaccount = instance
    if(user.role !== 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    let productData = request.only(['description', 'banner_img', 'niches', 'categories'])
    instaaccount.product = productData;
    try {
      await instaaccount.save()
    } catch(e) {
      return response.apiFail(e, 'product_save_failed')
    }
    return response.apiUpdated(instaaccount)
  }

  async delete({ request, auth, instance, response }) {
    const user = auth.user
    let instaaccount = instance
    if(user.role !== 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    await instaaccount.delete()
    return response.apiDeleted()
  }

  async deleteProduct({ request, auth, instance, response }) {
    const user = auth.user
    let instaaccount = instance
    if(user.role !== 'admin' && user._id.toString() != instance.user_id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    instaaccount.product = null
    await instaaccount.save()
    return response.apiDeleted(instaaccount);
  }

  async getInstaInfo(username) {
    return {
      posts: this.randomIntBetween(10, 10000),
      following: this.randomIntBetween(0, 200),
      follower_count: this.randomIntBetween(10000, 999999),
      profile_img: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=U7n98U2i0OoAX8BMvzo&oh=7b89d55f19d64f55b9f1a7b139ea47b9&oe=5E8D5BFA',
      bio: '<p>Lorem ipsum dolor sit amet...</p>',
      type: 'business'
    }
  }

  async validateInsta(username, code) {
    return true;
  }

  randomIntBetween(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
}

module.exports = InstaaccountsController
