'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const { validate } = use('Validator')
const { isDevelopment } = use('App/Helpers')
const randomstring = require('randomstring')
class AuthController {

  async register({ request, auth, response }) {
    const rules = {
      name: 'required|max:40',
      email: 'required|email|unique:users,email|max:190',
      password: 'required|max:100',
      country: 'required|max:150',
      gender: 'max:10',
      paypal_email: 'max:190'
    }
    const messages = {
      'name.required' : 'name_missing',
      'name.max' : 'name_too_long',
      'email.required' : 'email_missing',
      'email.email' : 'email_invalid',
      'email.unique' : 'email_already_exists',
      'email.max' : 'email_too_long',
      'password.required' : 'password_missing',
      'password.max': 'password_too_long',
      'country.required' : 'country_missing',
      'country.max' : 'country_too_long',
      'paypal_email.max' : 'paypal_too_long'
    }
    const validation = await validate(request.all(), rules, messages)
    if(validation.fails()) {
      return response.send({
        success: false,
        messages: validation.messages()
      })
    }
    let data = request.only(['name', 'email', 'password', 'country', 'gender', 'paypal_email'])
    data['verify_token'] = randomstring.generate(40)
    let user = await User.create(data)
    let token = await auth.generate(user)
    user.password = undefined
    Object.assign(user, token)
    return response.send({
      success: true,
      user
    })
  }

  async login({request, auth, response}) {
    let {email, password} = request.all()
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)
        user.password = undefined
        Object.assign(user, token)
        return response.json({
          success: true,
          user
        })
      }
    } catch(e) {
        return response.json({
          success: false,
          message: isDevelopment() ? e.message : 'login_failed'
        })
    }
  }



}

module.exports = AuthController
