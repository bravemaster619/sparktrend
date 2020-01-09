'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/Instaaccount')} */
const Instaaccount = use('App/Models/Instaaccount')
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
    const instaaccounts = await Instaaccount.query(decodeQuery()).fetch()
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
    const instaaccount = new Instaaccount({
      user_id: user._id,
      username: request.only(['username']).username,
      verified: false,
      verification_code: randomstring.generate(7)
    })
    await instaaccount.save()
    return response.apiCreated(instaaccount)
  }

  async getInstaInfo({ request, auth, response }) {

  }

}

module.exports = InstaaccountsController
