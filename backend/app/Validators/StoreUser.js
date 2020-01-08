'use strict'

const BaseValidator = require('./BaseValidator')

class StoreUser extends BaseValidator {
  get rules () {
    return {
      name: 'required|min:2|max:100',
      email: `required|email|unique:users,email`,
      password: 'required|min:6|max:255',
      country: 'required|min:3|max:100',
      gender: 'required|in:0,1',
      paypal_email: 'min:3|max:255',
      locale: 'in:en,ar'
    }
  }
}

module.exports = StoreUser
