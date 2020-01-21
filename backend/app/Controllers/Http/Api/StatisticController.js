'use strict'

const BaseController = require('./BaseController')
const moment = require('moment')
const Order = use('App/Models/Order')
const { $n, $b } = require('../../../Helpers')

class StatisticController extends BaseController {

  // return statistics for main dashboard
  async dashboard({request, auth, response}) {
    const user = auth.user
    const now = new Date
    const firstDOM = new Date((new moment(now)).format("YYYY-MM-01"))
    // this month sales
    const monthlySale = await Order.where({
      "seller_id" : user._id,
      "history.paid_at" : { $gte: firstDOM },
      "history.refunded_at" : null
    }).sum('total')
    // total sales
    const totalSale = await Order.where({
      "seller_id" : user._id,
      "history.paid_at" : { $exists: true },
      "history.refunded_at" : null
    }).sum('total')
    const purchaseStats = {}
    const config = this.getSiteConfig()
    const expiryTime = new Date(now.getTime() - config.order.time_margin.accept * 1000)
    purchaseStats.started = await user.purchases().where({
      "history.created_at" : {$exists: true, $gte: expiryTime},
      "history.rejected_at" : null,
      "history.refunded_at" : null,
      "history.expired_at" : null,
      "history.completed_at" : null
    }).count()
    purchaseStats.expired = await user.purchases.where({
      "history.created_at" : { $exists: true, $lt: expiryTime },
      "history.rejected_at" : null,
      "history.accepted_at" : null,
      "history.completed_at" : null
    }).count()
    purchaseStats.rejected = await user.purchases.where({
      "history.rejected_at" : {$exists: true}
    }).count()
    purchaseStats.failed = await user.purchases.where({
      "history.refunded_at" : { $exists: true }
    })
    return response.apiItem({
      monthly_sale: $n(monthlySale),
      total_sale: $n(totalSale),
      purchases: await user.purchases().fetch(),
      sales: await user.sales().fetch()
    })
  }

}

module.exports = StatisticController
