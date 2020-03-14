'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const BaseController = require('./BaseController')
/** @type {typeof import('../../../Models/User')} */
const User = use('App/Models/User')
const Instaaccount = use('App/Models/Instaaccount')
// const Validator = use('Validator')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
// const Config = use('Config')
const { $n, $b } = require('../../../Helpers')
/**
 *
 * @class UsersController
 */
class UsersController extends BaseController {
  /**
   * Index
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, auth }) {
    const user = auth.user
    if (user.role !== 'admin') {
      throw new UnAuthorizeException
    }
    const parsedQuery = this.buildAdminUserQuery(request)
    const users = await User.query()
      .with('instaaccounts')
      .where(parsedQuery.where)
      .skip(parsedQuery.skip)
      .limit(parsedQuery.limit)
      .orderBy({created_at: -1})
      .fetch()
    const total = await User.query()
      .where(parsedQuery.where)
      .count()
    return response.apiCollection(users, { total })
  }

  /**
   * Store
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // async store ({request, response}) {
  //   await this.validate(request.all(), User.rules())
  //   const user = new User(request.only('name', 'email'))
  //   const password = await Hash.make(request.input('password'))
  //   const verificationToken = crypto.createHash('sha256').update(uuid.v4()).digest('hex')
  //   user.set({
  //     password: password,
  //     verificationToken: verificationToken,
  //     verified: false
  //   })
  //   await user.save()
  //   await Mail.send('emails.verification', { user: user.get() }, (message) => {
  //     message.to(user.email, user.name)
  //     message.from(Config.get('mail.sender'))
  //     message.subject('Please Verify Your Email Address')
  //   })
  //   return response.apiCreated(user)
  // }

  /**
   * Show
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ request, response, instance, auth }) {
    const user = auth.user
    if (user.role !== 'admin' && user._id !== instance._id) {
      throw UnAuthorizeException.invoke()
    }
    if(user.role === 'admin') {
      let role = instance.role
      instance = JSON.parse(JSON.stringify(instance))
      instance.role = role
    }
    return response.apiItem(instance)
  }

  /**
   * Update
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   */
  async update ({ request, response, params, instance, auth }) {
    const user = auth.user
    if (instance._id.toString() !== user._id.toString() && user.role !== 'admin') {
      throw UnAuthorizeException.invoke()
    }
    let userData = ['name', 'locale', 'paypal_email', 'gender', 'country']
    if(user.role === 'admin') {
      userData = [...userData, 'email', 'verified']
      if(user._id !== instance._id && request.input("password")) {
        userData.push('password')
      }
    }
    instance.merge(request.only(userData))
    instance.verified = $b(instance.verified)
    await instance.save()
    if(user.role === 'admin') {
      let role = instance.role
      instance = JSON.parse(JSON.stringify(instance))
      instance.role = role
    }
    return response.apiUpdated(instance)
  }

  /**
   * Destroy
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ request, response, instance, auth }) {
    const user = instance
    await Instaaccount.query()
      .where('user_id', user._id)
      .delete()
    await user.delete()
    return response.apiDeleted()
  }

  /**
   * Upload
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async upload ({ request, response, instance, auth }) {
    const user = instance
    if (String(auth.user._id) !== String(user._id)) {
      throw UnAuthorizeException.invoke()
    }
    const image = request.file('image', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    const fileName = `${use('uuid').v1().replace(/-/g, '')}_${image.clientName}`
    await image.move(use('Helpers').publicPath('uploads'), { name: fileName })
    const filePath = `uploads/${fileName}`
    await user.images().create({ fileName, filePath })
    // await user.related('images').load()
    return response.apiUpdated(user)
  }

  /**
   * Get images of user
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   */
  async images ({ request, response, instance, decodeQuery }) {
    const user = instance
    const images = await user.images().query(decodeQuery()).fetch()
    return response.apiCollection(images)
  }


  buildAdminUserQuery(request) {
    const length = 10 // page length is 20

    let page = $n(request.input("page"), 1)
    if (page < 1) page = 1

    const skip = (page - 1) * length
    const limit = length
    const where = { role: 'user' }
    return { skip, limit, where }
  }

}

module.exports = UsersController
