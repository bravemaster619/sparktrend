'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Instaaccount')} */
const Instaaccount = use('App/Models/Instaaccount')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
/**
 *
 * @class ProductsController
 */
class ProductsController extends BaseController{
  /**
   * Index
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({request, response, decodeQuery}) {
    const instaaccounts = await Instaaccount.query(decodeQuery()).where({verified: true}).fetch()
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

  async store({ request, response, instance, auth }) {
    let instaccount = instance
    let user = auth.user;
    if (user.role !== 'admin' && instance.user_id.toString() !== user._id.toString()) {
      throw UnAuthorizeException.invoke()
    }
    let productData = request.only(['description', 'banner_img', 'niches', 'categories'])
    instaccount.product = productData;
    try {
      await instaccount.save()
    } catch(e) {
      return response.apiFail(e, 'product_save_failed')
    }
    return response.apiUpdated(instaccount)
  }

}

module.exports = ProductsController
