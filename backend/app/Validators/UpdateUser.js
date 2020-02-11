'use strict'

const BaseValidator = require('./BaseValidator')

class UpdateUser extends BaseValidator {
  get rules () {
    const userId = this.ctx.params.id
    return {
      name: 'min:2|max:100',
      email: `email|unique:users,email,_id,${userId}`,
      country: 'required|min:3|max:100',
      gender: 'required|in:male,female',
      paypal_email: 'min:3|max:255',
      locale: 'in:en,ar'
    }
  }
}

module.exports = UpdateUser
