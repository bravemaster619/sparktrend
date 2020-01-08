'use strict'

const BaseValidator = require('./BaseValidator')

class StoreProduct extends BaseValidator {

  get rules() {
    return {
      description: 'required|min:10|max:500',
      banner_img: 'max:1000',
      niches: 'max:255',
    }
  }

}
module.exports = StoreProduct;
