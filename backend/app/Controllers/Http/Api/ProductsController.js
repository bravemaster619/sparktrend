'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Instaaccount')} */
const Instaaccount = use('App/Models/Instaaccount')

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

  async store({request, auth, response}) {
    await this.validate(request.all(), Product.rules())
  }

}

module.exports = ProductsController
