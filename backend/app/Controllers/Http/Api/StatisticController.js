'use strict'

const BaseController = require('./BaseController')
const moment = require('moment')
const Order = use('App/Models/Order')
const { $n, $b } = require('../../../Helpers')
const util = require('util')
class StatisticController extends BaseController {

  constructor () {
    super();
  }

  // return statistics for main dashboard
  async dashboard({request, auth, response}) {
    const user = auth.user
    const now = new Date
    const firstDOM = new Date((new moment(now)).format("YYYY-MM-01"))
    // this month sales
    const monthlySale = $n(await Order.where({
      "seller_id" : user._id,
      "history.paid_at" : { $gte: new Date(firstDOM) },
      "history.refunded_at" : null
    }).sum('total'))
    // total sales
    const totalSale = $n(await Order.where({
      "seller_id" : user._id,
      "history.paid_at" : { $exists: true },
      "history.refunded_at" : null
    }).sum('total'))
    const Database = use('Database')
    const mongoClient = await Database.connect()
    const purchaseStats = await this.getPurchaseStats(mongoClient, user)
    const salesStats = await this.getSalesStats(mongoClient, user)
    const upcomingOrders = await user.sales().where({
      "history.completed_at": null,
      "history.refunded_at": null,
      "history.rejected_at": null,
      "history.expired_at": null,
    }).fetch()
    return response.apiItem({
      monthlySale, totalSale, purchaseStats, salesStats, upcomingOrders
    })
  }



  async getPurchaseStats(mongoClient, user) {
    const now = new Date
    const purchaseStats = {}
    const config = await this.getSiteConfig()
    const acceptExpiryTime = new Date(now.getTime() - config.order.time_margin.accept)
    purchaseStats.started = $n(await user.purchases().where({
      "history.accepted_at": {$exists: true},
      "history.completed_at": null,
      "history.rejected_at": null,
      "history.expired_at": null,
      "history.refunded_at": null
    }).count())
    purchaseStats.expired = $n(await user.purchases().where({
      "history.created_at" : { $exists: true, $lt: acceptExpiryTime },
      "history.rejected_at" : null,
      "history.accepted_at" : null,
      "history.completed_at" : null
    }).count())
    purchaseStats.rejected = $n(await user.purchases().where({
      "history.rejected_at" : {$exists: true}
    }).count())
    purchaseStats.completed = $n(await user.purchases().where({
      "history.refunded_at": null,
      "history.completed_at": {$exists: true}
    }).count())
    // for more complicated query, we have to get MongoDB Client Object
    purchaseStats.failed = $n(await user.purchases().where({
      "history.accepted_at": {$exists: true},
      $or: [
        { "history.expired_at": {$exists: true} },
        { "history.refunded_at": {$exists: true} }
      ]
    }).count())
    /*
    Added request_expiry and deadline keys to document in order to avoid such complicated aggregation as shown in below:

    let failedOrderCountQuery = require('../../../../database/query/failed-orders-count')
    // add completion time margin to deadline in query
    failedOrderCountQuery = failedOrderCountQuery.replace('{{time_margin}}', config.order.time_margin.complete)
    // set current time in query
    failedOrderCountQuery = failedOrderCountQuery.replace('{{current_time}}', "new Date()")
    // set user id for orders
    failedOrderCountQuery = failedOrderCountQuery.replace('{{user_query}}', `"buyer_id": user._id,`)
    const failedOrderCountResult = await mongoClient.collection('orders').aggregate(eval(failedOrderCountQuery)).get()
    if (failedOrderCountResult && failedOrderCountResult.length) {
      purchaseStats.failed = $n(failedOrderCountResult[0].count)
    } else {
      purchaseStats.failed = 0
    }
    */
    return purchaseStats
  }

  async getSalesStats(mongoClient, user) {
    const now = new Date
    const salesStats = {}
    const config = await this.getSiteConfig()
    const acceptExpiryTime = new Date(now.getTime() - config.order.time_margin.accept)
    salesStats.started = $n(await user.sales().where({
      "history.accepted_at": {$exists: true},
      "history.completed_at": null,
      "history.rejected_at": null,
      "history.expired_at": null,
      "history.refunded_at": null
    }).count())
    salesStats.expired = $n(await user.sales().where({
      "history.created_at" : { $exists: true, $lt: acceptExpiryTime },
      "history.rejected_at" : null,
      "history.accepted_at" : null,
      "history.completed_at" : null
    }).count())
    salesStats.rejected = $n(await user.sales().where({
      "history.rejected_at" : {$exists: true}
    }).count())
    salesStats.completed = $n(await user.sales().where({
      "history.refunded_at": null,
      "history.completed_at": {$exists: true}
    }).count())
    salesStats.failed = $n(await user.sales().where({
      "history.accepted_at": {$exists: true},
      $or: [
        { "history.expired_at": {$exists: true} },
        { "history.refunded_at": {$exists: true} }
      ]
    }).count())

    /*
    Added request_expiry and deadline keys to document in order to avoid such complicated aggregation as shown in below:

    // for more complicated query, we have to get MongoDB Client Object
    let failedOrderCountQuery = require('../../../../database/query/failed-orders-count')
    // add completion time margin to deadline in query
    failedOrderCountQuery = failedOrderCountQuery.replace('{{time_margin}}', config.order.time_margin.complete)
    // set current time in query
    failedOrderCountQuery = failedOrderCountQuery.replace('{{current_time}}', "new Date()")
    // set user id for orders
    failedOrderCountQuery = failedOrderCountQuery.replace('{{user_query}}', `"seller_id": user._id,`)
    const failedOrderCountResult = await mongoClient.collection('orders').aggregate(eval(failedOrderCountQuery)).get()
    if (failedOrderCountResult && failedOrderCountResult.length) {
      salesStats.failed = $n(failedOrderCountResult[0].count)
    } else {
      salesStats.failed = 0
    }*/
    return salesStats
  }

}

module.exports = StatisticController
