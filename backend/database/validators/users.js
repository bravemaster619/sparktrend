module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      properties: {

        name: {
            bsonType: 'string',
            minLength:2,
            maxLength:255
          },

        email: {
            bsonType: 'string',
            minLength:3,
            maxLength:1000
          },

        password: {
            bsonType: 'string',
            minLength:1,
            maxLength:1000
          },

        country: {
            bsonType: 'string',
            minLength: 2,
            maxLength: 1000
          },

        gender: { enum: ['male', 'female'] },

        verficationToken: { bsonType: 'string' },

        verified: { bsonType: 'bool' },

        locale: {
            bsonType: 'string',
            maxLength: 100
          },

        paypal_email : {
            bsonType: 'string',
            minLength:3,
            maxLength:1000
          },

        created_at: { bsonType: 'date' },

        updated_at: { bsonType: 'date' }

      }
    }
  }
}
