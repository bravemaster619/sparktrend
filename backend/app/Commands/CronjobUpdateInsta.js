'use strict'

const { Command } = require('@adonisjs/ace')
const Instaaccount = use("App/Models/Instaaccount")

class UpdateInsta extends Command {
  static get signature () {
    return 'cronjob:insta'
  }

  static get description () {
    return "Update instagram account info on a regular basis";
  }

  async handle (args, options) {
    await this.deleteUnverifiedAccounts()
    await this.refetchInstagramInfo()
  }

  async deleteUnverifiedAccounts() {
    console.log('Begin deleting unverified accounts')
    const now = new Date()
    const oldCreatedAt = new Date( now.getTime() - 24 * 3600 * 1000 )
    const accounts = await Instaaccount.query()
      .where({ verified: false })
      .where({ created_at: { $lte: oldCreatedAt } })
      .delete()
    console.log(`End deleting unverified accounts, deleted ${accounts.result.n} accounts`)
  }
  async refetchInstagramInfo() {
    console.log('Begin refetching instagram user info')
    const now = new Date()
    const oldLastCralwedAt = new Date(now.getTime() - 3 * 24 * 3600 * 1000)
    const oldestAccounts = await Instaaccount.query()
      .where({ verified: true })
      .where({
        $or: [
          {
            last_crawled_at: null,
            
          }, {
          last_crawled_at: { $lte: oldLastCralwedAt }
        }
        ]
      })
      .limit(10)
      .fetch()
    if (!oldestAccounts.rows || !oldestAccounts.rows.length) {
      console.log('No accounts to update')
      console.log('End refetching instagram info')
      return
    }
    console.log(`Start updating ${oldestAccounts.rows.length} accounts`)
    const CrawlerManager = require('../../lib/InstagramCrawler/CrawlerManager')
    let updated = 0
    let failed = 0
    for (let account of oldestAccounts.rows) {
      console.log(`Start user: ${account.username}`)
      try {
        let graphql = await CrawlerManager.getInstaInfo(account.username)
        const userdata = graphql.graphql.user
        account.username = userdata.username
        account.follower_count = userdata.edge_followed_by.count
        account.profile_img = userdata.profile_pic_url
        account.type = userdata.is_business_account ? "business" : "personal"
        account.last_crawled_at = new Date
        await account.save()
        updated += 1
        await this.sleep()
      } catch (e) {
        failed += 1
        console.log(`Error for user: ${account.username}`)
        console.error(e)
      }
    }
    console.log(`Updated ${updated} accounts, failed: ${failed}`)
    console.log(`End refetching instagram info`)
  }
  sleep() {
    const sleepingTime = (Math.random() * 10000) / 3
    return new Promise((resolve) => {
      console.log(`sleeping for ${sleepingTime / 1000} secs`)
      setTimeout(() => { 
        resolve(true)
      }, sleepingTime)
    })
  }
}

module.exports = UpdateInsta
