const ProductCategoryValidator = require('./product-category')

module.exports = {
  bsonType: ['object', 'null'],
  properties: {

    description: {
        bsonType: 'string',
        maxLength: 65535
      },

    niches: {
        bsonType: 'string',
        maxLength: 1000
      },

    banner_img: {
        bsonType: 'string',
        maxLength: 65535
      },

    categories: {
        bsonType: 'array',
        minItems: 1,
        maxItems: 1000,
        items: ProductCategoryValidator
      }

  }
}
