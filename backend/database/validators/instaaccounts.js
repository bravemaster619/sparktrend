const DemoValidator = require('./demographics')
const ProductValidator = require('./product')
module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'username'],
      properties: {

        user_id: {
            bsonType: ['objectId'],
            maxLength: 65535
          },

        username: {
            bsonType: 'string',
            maxLength: 1000
          },

        profile_img: {
            bsonType: 'string',
            maxLength: 65535
          },

        follower_count: { bsonType: 'int' },

        insights_picture: {
            bsonType: 'string',
            maxLength: 65535
          },

        verfication_code: {
            bsonType: 'string',
            maxLength: 65535
          },

        verified: { bsonType: 'bool' },

        allowed: { bsonType: 'bool' },

        type: {
            bsonType: 'string',
            maxLength: 100
          },

        demographics: {
            bsonType: 'object',
            properties: {
              age: DemoValidator,
              gender: DemoValidator,
              country: DemoValidator
            }
          },
        total_shoutout: {
            bsonType: ['int', 'null'],
          },
        completed_shoutout: {
            bsonType: ['int', 'null'],
          },

        product: ProductValidator,

        rating: {
          bsonType: ['object', 'null']
        },

        created_at: { bsonType: 'date' },

        updated_at: { bsonType: 'date' }
      }
    }
  }
}
