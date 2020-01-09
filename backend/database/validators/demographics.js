module.exports = {
  bsonType: 'array',
  minItems: 1,
  maxItems: 100,
  uniqueItems: true,
  items: {
    bsonType: 'object',
    required: ['name', 'percent'],
    properties: {

      name: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100
        },

      percent: {
          bsonType: 'int',
          minimum: 0,
          maximum: 100
        }
    }
  }
}
