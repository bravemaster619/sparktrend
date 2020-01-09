'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { $n } = require('../Helpers')
/**
 * @swagger
 * components:
 *   schemas:
 *     NewOrder:
 *       type: object
 *       required:
 *         - insta_id
 *         - start_from
 *         - category
 *         - pricing_idx
 *         - posts
 *       properties:
 *         insta_id:
 *           type: string
 *         category:
 *           type: string
 *         pricing_idx:
 *           type: integer
 *         with_bio:
 *           type: boolean
 *         bio_url:
 *           type: string
 *         swipe_up_url:
 *           type: string
 *         start_from:
 *           type: string
 *           format: date-time
 *         caption:
 *           type: string
 *         additional_info:
 *           type: string
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
  *     Order:
 *       allOf:
 *         - $ref: '#/components/schemas/NewOrder'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *             buyer_id:
 *               type: string
 *             seller_id:
 *               type: string
 *             history:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: string
 *                 accepted_at:
 *                   type: string
 *                 started_at:
 *                   type: string
 *                 completed_at:
 *                   type: string
 *                 paid_at:
 *                   type: string
 *                 rejected_at:
 *                   type: string
 *                 refunded_at:
 *                   type: string
 *             time:
 *               type: integer
 *             price:
 *               type: number
 *             bio_price:
 *               type: number
 *             subtotal:
 *               type: number
 *             charge:
 *               type: number
 *             total:
 *               type: number
 *             verification_code:
 *               type: string
 *             payment_method:
 *               type: string
 *             created_at:
 *               type: string
 *             updated_at:
 *               type: string
 */
class Order extends Model {

  calcSubtotal() {
    this.subtotal = this.with_bio ? $n(this.price) + $n(this.bio_price) : $n(this.price);

    return this.subtotal;
  }

  calcTotalPrice() {
    this.total = this.calcSubtotal() + $n(this.charge);

    return this.total;
  }


}

module.exports = Order
