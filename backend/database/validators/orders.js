module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['buyer_id', 'seller_id', 'insta_id', 'time', 'posts', 'price', 'total'],
      properties: {

        buyer_id: { bsonType: 'objectId' },

        seller_id : { bsonType: 'objectId' },

        insta_id: { bsonType: 'objectId' },

        seller_name: { bsonType: 'string' },

        buyer_name: { bsonType: 'string' },

        category: {
          bsonType: 'string',
          maxLength: 1000
        },

        pricing_idx: {
          bsonType: 'int',
          minimum: 0,
          maximum: 1000
        },

        with_bio : { bsonType: 'bool' },

        bio_url: {
          bsonType: 'string',
          maxLength: 65535
        },

        swipe_up_url: {
          bsonType: 'string',
          maxLength: 65535
        },

        start_from: { bsonType: 'date' },

        caption: {
          bsonType: 'string',
          maxLength: 65535
        },

        additional_info: {
          bsonType: 'string',
          maxLength: 65535
        },

        posts: {
          bsonType: 'array',
          minItems: 1,
          maxItems: 100,
          items: {
            bsonType: 'object',
            properties: {
              filename: {
                bsonType: 'string'
              },
              type: {
                bsonType: 'string'
              },
              path: {
                bsonType: 'string'
              }
            }
          }
        },

        screenshots: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              filename: {
                bsonType: 'string'
              },
              type: {
                bsonType: 'string'
              },
              path: {
                bsonType: 'string'
              }
            }
          }
        },

        time: {
          bsonType: 'int',
          minimum: 0
        },

        price: {
          minimum: 0
        },

        bio_price: {
          minimum: 0
        },

        charge: {
          minimum: 0
        },

        total: {
          minimum: 0
        },

        verfication_code: {
          bsonType: 'string',
          maxLength: 1000
        },

        history: {
          bsonType: 'object',
          properties: {
            created_at: { bsonType: 'date' },
            accepted_at: { bsonType: 'date' },
            started_at: { bsonType: 'date' },
            completed_at: { bsonType: 'date' },
            expired_at: { bsonType: 'date' },
            paid_at: { bsonType: 'date' },
            rejected_at: { bsonType: 'date' },
            refunded_at: { bsonType: 'date' },
            rated_at: { bsonType: 'date' }
          }
        },

        payment_method: {
          bsonType: 'string',
          maxLength: 1000
        },

        expiry_date: {
          bsonType: 'date'
        },

        rating: {
          bsonType: 'object',
          required: ['communication', 'professionalism', 'recommendation'],
          properties: {
            communication: {
              minimum: 0
            },
            professionalism: {
              minimum: 0
            },
            recommendation: {
              minimum: 0
            },
            feedback: {
              bsonType: 'string',
              maxLength: 65535
            }
          }
        },

        created_at: { bsonType: 'date' },

        updated_at: { bsonType: 'date' }
      }
    }
  }
}
