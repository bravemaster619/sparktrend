'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')

class AuthAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next) {
    try {
      await auth.check()
      if (auth.user.role !== 'admin') {
        throw UnAuthorizeException.invoke()
      }
    } catch (e) {
      throw UnAuthorizeException.invoke()
    }
    await next()
  }
}

module.exports = AuthAdmin
