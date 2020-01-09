module.exports = {
  bsonType: 'object',
  required: ['type', 'pricing'],
  properties: {

    type: {
        bsonType: 'string',
        maxLength: 1000
      },

    pricing: {
        bsonType: 'array',
        minItems: 1,
        maxItems: 1000,
        items: {
          bsonType: 'object',
          properties: {
            time: {
                bsonType: 'int',
                minimum: 0
              },
            price: {
                minimum: 0
              },
            bio_price: {
                minimum: 0
              }
          }
        }
      }
  }
}
