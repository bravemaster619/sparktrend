'use strict'

const { Command } = require('@adonisjs/ace')
const Instaaccount = use("App/Models/Instaaccount")

class CronjobRandomsort extends Command {
  static get signature () {
    return 'cronjob:randomsort'
  }

  static get description () {
    return 'Update instaaccounts random order'
  }

  async handle(args, options) {
    console.log('Begin random sort')
    const products = await Instaaccount.query()
      .where({ allowed: true })
      .where({ product: { $exists: true } })
      .fetch()
    if (!products.rows || !products.rows.length ) {
      return;
    }
    let count = 0
    for (let product of products.rows) {
      product.priority = Number((Math.random() * 10000).toFixed(0))
      await product.save()
      count += 1
    }
    console.log(`End random sort, updated ${count} products`)
  }
}

module.exports = CronjobRandomsort
