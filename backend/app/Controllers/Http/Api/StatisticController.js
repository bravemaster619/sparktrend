'use strict'

const BaseController = require('./BaseController')
const moment = require('moment')
const User = use('App/Models/User')
const Instaaccount = use('App/Models/Instaaccount')
const Order = use('App/Models/Order')
const { $n, $b } = require('../../../Helpers')
const util = require('util')

class StatisticController extends BaseController {

  constructor () {
    super()
  }

  // return statistics for main dashboard
  async dashboard ({ request, auth, response }) {
    const user = auth.user
    const now = new Date
    // first date of month
    const firstDOM = new Date((new moment(now)).format('YYYY-MM-01'))
    // this month sales
    const monthlySale = $n(await Order.where({
      'seller_id': user._id,
      'history.paid_at': { $gte: new Date(firstDOM) },
      'history.refunded_at': null
    }).sum('total'))
    // total sales
    const totalSale = $n(await Order.where({
      'seller_id': user._id,
      'history.paid_at': { $exists: true },
      'history.refunded_at': null
    }).sum('total'))
    const Database = use('Database')
    const mongoClient = await Database.connect()
    const purchaseStats = await this.getPurchaseStats(mongoClient, user)
    const salesStats = await this.getSalesStats(mongoClient, user)
    const upcomingOrders = await user.sales().where({
      'history.completed_at': null,
      'history.refunded_at': null,
      'history.rejected_at': null,
      'history.expired_at': null,
    }).fetch()
    return response.apiItem({
      monthlySale, totalSale, purchaseStats, salesStats, upcomingOrders
    })
  }

  // statistics for admin dashboard
  async adminDashboard ({ request, auth, response }) {
    const now = new Date
    // last day of previous month
    const compareTime = new Date(moment(now).subtract(1, 'months').endOf('month').format("YYYY-MM-DD 23:59:59"))
    const data = {
      total: {
        users: {}, products: {}, orders: {}, sale: {}
      },
      recent: {
        users: [], instaaccounts: [], orders: []
      },
      chart: {
        sales: {
          data: [
            [], // monthly for a year
            []  // daily for a week
          ],
          label: [
            [],
            []
          ]
        },
        orders: {
          data: [], // monthly for half a year
          label: []
        }
      }
    }
    // total users
    data.total.users.count = await User.where({
      verified: true,
      role: 'user'
    }).count()
    const lmUsersCount = await User.where({
      verified: true,
      role: 'user',
      created_at: { $lt: compareTime }
    }).count()
    data.total.users.increase = this.getIncPercent(lmUsersCount, data.total.users.count)

    // total products
    data.total.products.count = await Instaaccount.where({
      verified: true,
      allowed: true
    }).count()

    const lmProducts = await Instaaccount.where({
      verified: true,
      allowed: true,
      created_at: { $lt: compareTime }
    }).count()

    data.total.products.increase = this.getIncPercent(lmProducts, data.total.products.count)

    // total orders
    data.total.orders.count = await Order.where({
      history: { $exists: true },
      "history.rejected_at": null
    }).count()

    const lmOrders = await Order.where({
      history: { $exists: true },
      "history.rejected_at": null,
      created_at: { $lt: compareTime }
    }).count()

    data.total.orders.increase = this.getIncPercent(lmOrders, data.total.orders.count)

    // total sale
    data.total.sale.count = await Order.where({
      "history.refunded_at": null,
      "history.paid_at": { $exists: true }
    }).sum('total')

    const lmSale = await Order.where({
      "history.refunded_at": null,
      "history.paid_at": { $exists: true },
      created_at: { $lt: compareTime }
    }).sum('total')
    data.total.sale.increase = this.getIncPercent(lmSale, data.total.sale.count)

    // recent users
    data.recent.users = await User.where({
      role: 'user'
    }).orderBy({
      created_at: -1
    }).limit(10).fetch()

    data.recent.instaaccounts = await Instaaccount.with('user').orderBy({
      created_at: -1
    }).limit(5).fetch()

    data.recent.orders = await Order.with([
      'instaaccount', 'buyer', 'seller'
    ]).orderBy({
      created_at: -1
    }).limit(20).fetch()

    // sales chart data
    // monthly
    for(let i=11; i>=0; i--) {
      let from = new Date(moment(now).subtract(i, 'months').startOf('month').format("YYYY-MM-DD 00:00:00"))
      let to = new Date(moment(now).subtract(i, 'months').endOf('month').format("YYYY-MM-DD 23:59:59"))
      let monthlySale = $n(await Order.where({
        "history.refunded_at": null,
        "history.paid_at": {
          $exists: true,
          $gt: from,
          $lt: to
        }
      }).sum('total'))
      data.chart.sales.data[0].push(monthlySale)
      data.chart.sales.label[0].push(moment(from).format('MMM'))
    }
    // daily
    for(let i=6; i>=0; i--) {
      let from = new Date(moment(now).subtract(i, 'days').format("YYYY-MM-DD 00:00:00"))
      let to = new Date(moment(now).subtract(i, 'days').format("YYYY-MM-DD 23:59:59"))
      let dailySale = $n(await Order.where({
        "history.refunded_at": null,
        "history.paid_at": {
          $exists: true,
          $gt: from,
          $lt: to
        }
      }).sum('total'))
      data.chart.sales.data[1].push(dailySale)
      data.chart.sales.label[1].push(moment(from).format("ddd"))
    }

    // order chart data
    for(let i=5; i>=0; i--) {
      let from = new Date(moment(now).subtract(i, 'months').startOf('month').format("YYYY-MM-DD 00:00:00"))
      let to = new Date(moment(now).subtract(i, 'months').endOf('month').format("YYYY-MM-DD 23:59:59"))
      let monthlyOrders = $n(await Order.where({
        history: { $exists: true },
        "history.rejected_at": null,
        created_at: {
          $gt: from,
          $lt: to
        }
      }).count())
      data.chart.orders.data.push(monthlyOrders)
      data.chart.orders.label.push(moment(from).format("MMM"))
    }

    return response.apiItem(data)
  }

  async getPurchaseStats (mongoClient, user) {
    const now = new Date
    const purchaseStats = {}
    const config = await this.getSiteConfig()
    const acceptExpiryTime = new Date(now.getTime() - config.order.time_margin.accept)
    purchaseStats.started = $n(await user.purchases().where({
      'history.accepted_at': { $exists: true },
      'history.completed_at': null,
      'history.rejected_at': null,
      'history.expired_at': null,
      'history.refunded_at': null
    }).count())
    purchaseStats.expired = $n(await user.purchases().where({
      'history.created_at': { $exists: true, $lt: acceptExpiryTime },
      'history.rejected_at': null,
      'history.accepted_at': null,
      'history.completed_at': null
    }).count())
    purchaseStats.rejected = $n(await user.purchases().where({
      'history.rejected_at': { $exists: true }
    }).count())
    purchaseStats.completed = $n(await user.purchases().where({
      'history.refunded_at': null,
      'history.completed_at': { $exists: true }
    }).count())
    // for more complicated query, we have to get MongoDB Client Object
    purchaseStats.failed = $n(await user.purchases().where({
      'history.accepted_at': { $exists: true },
      $or: [
        { 'history.expired_at': { $exists: true } },
        { 'history.refunded_at': { $exists: true } }
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

  async getSalesStats (mongoClient, user) {
    const now = new Date
    const salesStats = {}
    const config = await this.getSiteConfig()
    const acceptExpiryTime = new Date(now.getTime() - config.order.time_margin.accept)
    salesStats.started = $n(await user.sales().where({
      'history.accepted_at': { $exists: true },
      'history.completed_at': null,
      'history.rejected_at': null,
      'history.expired_at': null,
      'history.refunded_at': null
    }).count())
    salesStats.expired = $n(await user.sales().where({
      'history.created_at': { $exists: true, $lt: acceptExpiryTime },
      'history.rejected_at': null,
      'history.accepted_at': null,
      'history.completed_at': null
    }).count())
    salesStats.rejected = $n(await user.sales().where({
      'history.rejected_at': { $exists: true }
    }).count())
    salesStats.completed = $n(await user.sales().where({
      'history.refunded_at': null,
      'history.completed_at': { $exists: true }
    }).count())
    salesStats.failed = $n(await user.sales().where({
      'history.accepted_at': { $exists: true },
      $or: [
        { 'history.expired_at': { $exists: true } },
        { 'history.refunded_at': { $exists: true } }
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

  getIncPercent(from, to) {
    if(from <= 0) {
      return 0;
    } else {
      return (to - from) / from * 100;
    }
  }

}

module.exports = StatisticController
