'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * @swagger
 * components:
 *   schemas:
 *     NewInstaaccount:
 *       type: object
 *       required:
 *         - _id
 *         - user_id
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *         user_id:
 *           type: string
 *         username:
 *           type: string
 *         verification_code:
 *           type: string
 *     RegisterToInstagram:
 *       type: object
 *       required:
 *         - _id
 *         - user_id
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *         user_id:
 *           type: string
 *         username:
 *           type: string
 *         verification_code:
 *           type: string
 *         follower_count:
 *           type: integer
 *         following:
 *           type: integer
 *         posts:
 *           type: integer
 *         profile_img:
 *           type: string
 *         bio:
 *           type: string
 *         type:
 *           type: string
 *         verified:
 *           type: boolean
 *     Demographics:
 *       type: object
 *       properties:
 *         age:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               percent:
 *                 type: integer
 *         country:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               percent:
 *                 type: integer
 *         gender:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               percent:
 *                 type: integer
 *     Product:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         niches:
 *           type: string
 *         banner_img:
 *           type: string
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               pricing:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     time:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     bio_price:
 *                       type: number
 *     AdminEditInstaaccount:
 *       type: object
 *       required:
 *         - allowed
 *         - verified
 *       properties:
 *         allowed:
 *           type: boolean
 *         verified:
 *           type: boolean
 *         demographics:
 *           $ref: '#/components/schemas/Demographics'
 *     Instaaccount:
 *       type: object
 *       required:
 *         - _id
 *         - user_id
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *         user_id:
 *           type: string
 *         username:
 *           type: string
 *         profile_img:
 *           type: string
 *         follower_count:
 *           type: integer
 *         insights_picture:
 *           type: string
 *         verification_code:
 *           type: string
 *         verified:
 *           type: boolean
 *         allowed:
 *           type: boolean
 *         type:
 *           type: string
 *         demographics:
 *           $ref: '#/components/schemas/Demographics'
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         total_shoutout:
 *           type: integer
 *         completed_shoutout:
 *           type: integer
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 */
class Instaaccount extends Model {

  user() {
    return this.belongsTo('App/Models/User')
  }

  orders() {
    return this.hasMany('App/Models/Order', '_id', 'insta_id')
  }

}

module.exports = Instaaccount
