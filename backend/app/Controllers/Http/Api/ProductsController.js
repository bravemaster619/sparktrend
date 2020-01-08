'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Product')} */
const Product = use('App/Models/Product')

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
    const products = await Product.query(decodeQuery()).fetch()
    return response.apiCollection(products)
  }

  async store({request, auth, response}) {
    await this.validate(request.all(), Product.rules())
  }

}

module.exports = ProductsController
