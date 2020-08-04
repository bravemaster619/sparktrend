'use strict'

const { Command } = require('@adonisjs/ace')
const Instaaccount = use("App/Models/Instaaccount")

class UpdateInsta extends Command {
  static get signature () {
    return `
      cronjob:insta
      { count?=10 : Number of accounts to update }
      { username?=\0 : Name of instagram account to update }
      { --delaccount : Flag to delete unverified account }
      { --force : Flag to force update regardless of last crawled time }
    `;
  }

  static get description () {
    return "Update instagram account info on a regular basis";
  }

  async handle(args, options) {
    if (options.delaccount) {
      await this.deleteUnverifiedAccounts();
    }
    const force = options.force
    let { username, count } = args
    if (username === '\u0000') {
      username = ''
    }
    await this.refetchInstagramInfo(username, Number(count), force)
    process.exit()
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
  async refetchInstagramInfo(username, count, force) {
    console.log('Begin refetching instagram user info')
    const now = new Date()
    const oldLastCralwedAt = new Date(now.getTime() - 3 * 24 * 3600 * 1000)
    const where = { verified: true }
    if (username) {
      where.username = username
    }
    if (!force) {
      where["$or"] = [
        {
          last_crawled_at: null,
        },
        {
          last_crawled_at: { $lte: oldLastCralwedAt },
        },
      ];
    }
    const oldestAccounts = await Instaaccount.query()
      .where(where)
      .limit(count)
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
