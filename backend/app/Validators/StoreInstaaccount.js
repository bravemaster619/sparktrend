'use strict'

const BaseValidator = require('./BaseValidator')

class StoreInstaaccount extends BaseValidator {
  get rules() {
    return {
      user_id: 'required|min:1|max:1000',
      username: 'required|min:2|max:1000'
    }
  }
}
