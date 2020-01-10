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

  static STATUS = {
    SHOUTOUT: {
      NOT_CREATED: 0,
      CREATED: 1,
      ACCEPTED: 2,
      STARTED: 3,
      EXPIRED: 4,
      COMPLETED: 5,
      REJECTED: -1
    },
    PAYMENT: {
      NOT_PAID: 0,
      PAID: 1,
      REFUNDED: -1
    }
  }

  calcSubtotal() {
    this.subtotal = this.with_bio ? $n(this.price) + $n(this.bio_price) : $n(this.price);

    return this.subtotal;
  }

  calcTotalPrice() {
    this.total = this.calcSubtotal() + $n(this.charge);

    return this.total;
  }

  relationship(user) {
    try {
      if (this.buyer_id.toString() === user._id.toString()) {
        return 'buyer'
      }
      if (this.seller_id.toString() === user._id.toString()) {
        return 'seller'
      }
    } catch(e) {
      console.log(e)
      return 'unknown'
    }
    return 'unknown'
  }

  getStatus() {
    let status = {
      shoutout: Order.STATUS.SHOUTOUT.NOT_CREATED,
      payment: Order.STATUS.PAYMENT.NOT_PAID
    }
    if (!(this.history)) {
      return status;
    }
    if (this.history.paid_at) {
      status.payment = Order.STATUS.PAYMENT.PAID;
    }
    if (this.history.refunded_at) {
      status.payment = Order.STATUS.PAYMENT.REFUNDED;
    }
    if (this.history.created_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.CREATED;
    }
    if (this.history.accepted_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.ACCEPTED;
    }
    if (this.history.started_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.STARTED;
    }
    if (this.history.expired_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.EXPIRED;
    }
    if (this.history.completed_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.COMPLETED;
    }
    if (this.history.rejected_at) {
      status.shoutout = Order.STATUS.SHOUTOUT.REJECTED;
    }
    return status
  }
}

module.exports = Order
