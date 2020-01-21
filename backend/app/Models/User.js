'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('lucid-mongo/src/LucidMongo/Model')} */
const Model = use('Model')

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - country
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *         country:
 *           type: string
 *           format: string
 *         gender:
 *           type: string
 *         paypal_email:
 *           type: string
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/NewUser'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 */

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden() {
    return ['password', 'verificationToken', 'role']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  images () {
    return this.morphMany('App/Models/Image', 'imageable_type', 'imageable_id')
  }

  type () {
    if (this.role === 'admin') {
      return 'admin'
    }
    return 'user'
  }

  purchases() {
    return this.hasMany('App/Models/Order', '_id', 'buyer_id')
  }

  sales() {
    return this.hasMany('App/Models/Order', '_id', 'seller_id')
  }

}

module.exports = User
