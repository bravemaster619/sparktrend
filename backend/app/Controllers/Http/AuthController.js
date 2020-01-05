'use strict'

const User = use('App/Models/User')

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
    const validation = await validate(request.all(), rules)
    if(validation.fails()) {
      return response.send({
        success: false,
        messages: validation.messages
      })
    }
    const data = request.only(['name', 'email', 'password', 'country', 'gender', 'paypal_email'])
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
          message: 'login_failed'
        })
    }

  }

}

module.exports = AuthController
