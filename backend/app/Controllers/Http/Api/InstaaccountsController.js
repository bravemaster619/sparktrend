'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Instaaccount')} */
const Instaaccount = use('App/Models/Instaaccount')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const randomstring = require('randomstring')
const { $n } = require('../../../Helpers')
const util = require('util')
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
  async index({ request, response }) {

    const parsedQuery = this.buildProductQuery(request)
    const instaaccounts = await Instaaccount
      .query()
      .where(parsedQuery.where)
      .where({allowed: true})
      .skip(parsedQuery.skip)
      .limit(parsedQuery.limit)
      .fetch()
    const total = await Instaaccount
      .query()
      .where(parsedQuery.where)
      .where({allowed: true})
      .count()
    return response.apiCollection(instaaccounts, { total })
  }

  async products({request, response}) {
    return this.index({request, response})
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
    const instainfo = await this.getInstaInfo(username)
    if (!instainfo) {
      return response.apiFail('cannot_get_instagram_account')
    }
    if (instainfo.follower_count < this.getSiteConfig()['seller']['minimum_followers']) {
      return response.validateFailed('insufficient_followers')
    }
    const instaaccount = new Instaaccount({
      user_id: user._id,
      username,
      verified: false,
      verification_code: randomstring.generate(7)
    })
    instaaccount.merge(instainfo)
    await instaaccount.save()
    return response.apiCreated(instaaccount)
  }

  // async registerInstagram({ request, auth, instance, response }) {
  //   const user = auth.user
  //   let instaaccount = instance
  //
  //   if (user.role != 'admin' && user._id.toString() != instance.user_id.toString()) {
  //     throw UnAuthorizeException.invoke()
  //   }
  //   const instainfo = await this.getInstaInfo(instaaccount.username)
  //   if (instaaccount.verified && instainfo.follower_count) {
  //
  //   } else {
  //     if (!instainfo) {
  //       return response.validateFailed('no_such_account')
  //     }
  //     if (instainfo.follower_count < 10000) {
  //       return response.validateFailed('insufficient_followers')
  //     }
  //     if (!instaaccount.verfication_code) {
  //       instaaccount.verification_code = randomstring.generate(7)
  //     }
  //   }
  //   if (instainfo) {
  //     instaaccount.follower_count = instainfo.follower_count
  //     instaaccount.profile_img = instainfo.profile_img
  //     instaaccount.type = instainfo.type
  //   }
  //   await instaaccount.save()
  //   instaaccount.merge(instainfo)
  //   return response.apiUpdated(instaaccount)
  // }

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
    try {
      const req = require('request-promise')
      const instaresp = await req(`https://www.instagram.com/${username}/?__a=1`)
      const instadata = JSON.parse(instaresp)
      const userdata = instadata.graphql.user
      return {
        follower_count: userdata.edge_followed_by.count,
        username: userdata.username,
        profile_img: userdata.profile_pic_url,
        type: userdata.is_business_account ? 'business' : 'personal'
      }
    } catch(e) {
      return null
    }
  }

  async validateInsta(username, code) {
    return true;
  }

  randomIntBetween(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  buildProductQuery(request) {
    const length = 20; // page length is 20

    // --- begin retrieve page ---
    let page = $n(request.input("page"), 1)
    if (page < 1) page =1;
    const skip = (page - 1) * length
    const limit = length
    // ---  end retrieve page  ---

    // --- begin retrieve price query ---
    let minPrice = $n(request.input("lp"), -1)
    let maxPrice = $n(request.input("hp"), -1)
    if (minPrice < 0) minPrice = null
    if (maxPrice < 0) minPrice = null

    // ---  end retrieve price query  ---

    // --- begin retrieve gender ---
    let gender = request.input("g")
    if (gender) gender = gender.toLowerCase()

    if (gender !== "male" && gender !== "female") {
      gender = null
    }
    // ---  end retrieve gender  ---

    // --- begin retrieve country ---
    let countries = request.input("c")
    if (countries) {
      countries = countries.split(":")
    } else {
      countries = null
    }
    // ---  end retrieve country  ---

    // --- begin retrieve niches ---
    let niches = request.input("n")
    if (niches) {
      niches = niches.split(":")
      niches.forEach((nich, index) => {
        niches[index] = nich.replace('_', ' & ')
      })
    } else {
      niches = null
    }
    // ---  end retrieve niches  ---

    // --- begin retrieve categories ---
    let categories = request.input("cat")
    if (categories) {
      categories = categories.split(":")
    } else {
      categories = null
    }
    // ---  end retrieve categories  ---

    // --- begin retrieve username ---
    let username = request.input("u")
    // ---  end retrieve username  ---

    // --- begin build where ---
    const where = {}
    if (minPrice || maxPrice) {
      if (minPrice) {
        where["product.categories"] = {$elemMatch: {"pricing.price": { $gt: minPrice }}}
      }
      if (maxPrice) {
        where["product.categories"] = {$elemMatch: {"pricing.price": { $lt: maxPrice }}}
      }
    }
    if (gender) {
      if (gender === "female") {
        where["demographics.gender"] = { $elemMatch: { name: "Women", percent: { $gt: 50 } } } ;
      } else {
        where["demographics.gender"] = { $elemMatch: { name: "Men", percent: { $gt: 50 } } } ;
      }
    }
    if (countries) {
      where["demographics.country"] = { $elemMatch: { name: { $in: countries } } }
    }
    if (niches) {
      where["product.niches"]  = { $in: niches }
    }
    if (categories) {
      where["product.categories"] = { $elemMatch: { type: { $in: categories } } }
    }
    if (username) {
      where["username"] =  { $regex: `.*${username}.*` }
    }
    // ---  end build where  ---
    // finally

    return { skip, limit, where: JSON.parse(JSON.stringify(where)) }
  }

  async getShoutoutHistory(instaaccount) {

  }

}

module.exports = InstaaccountsController
