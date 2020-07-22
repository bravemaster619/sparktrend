const prompts = require('prompts')
const puppeteer = require('puppeteer')
const dotenv = require('dotenv')

dotenv.config()

class InstagramCrawler {
  constructor () {
    this.browser = null
    this.page = null
    this.processing = false
  }

  async init () {
    console.log('---Starting headless browser---')
    this.processing = true
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      userDataDir: './instagram-user-data'
    })
    console.log('Browser launched')
    this.page = await this.browser.newPage()
    console.log('Navigate to instagram my account page')

    try {
      await this.page.goto('https://www.instagram.com/accounts/activity')
      await this.page.waitForSelector('h2.Zpoz-', {
        timeout: 1100
      })
      console.log('Successfully logged in')
      return
    } catch (e) {
      console.log('Not logged in')
    }

    console.log('Navigate to instagram login page')
    
    await this.page.goto('https://www.instagram.com/accounts/login/')
    await this.page.waitForSelector('input[name="username"]')
    await this.page.type('input[name="username"]', process.env.INSTAGRAM_USERNAME)
    await this.page.type('input[name="password"]', process.env.INSTAGRAM_PASSWORD)
    await this.page.click('button[type="submit"]')
    console.log('Clicked login button')
    try {
      await this.page.waitForSelector('[placeholder=Search]', {
        timeout: 5000
      })
      console.log('Logged in successfully')
      this.processing = false
    } catch (e) {
      console.log('Warning: login first try failed. Might require email verification')

      await this.page.screenshot({ path: 'login-fail.png' })

      const isSecurity = await this.page.$$('form.JraEb')

      if (isSecurity[0]) {
        console.log('Security check')

        const isSecurity = await this.page.$$('form.JraEb button')

        console.log('Click send security code')

        await isSecurity[0].click()

        // await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

        await this.page.waitFor(1100)

        const response = await prompts({
          type: 'text',
          name: 'value',
          message: 'Code?'
        })

        console.log('wait for form input')

        await this.page.waitFor('form input')

        await this.page.screenshot({ path: 'login-fail-2.png' })

        const input = await this.page.$$('form input')

        console.log('Found security code input')

        await input[0].click()

        console.log('Input security code')

        await this.page.type('form input', response.value, {
          delay: 114
        })

        console.log('Click submit button')

        const button = await this.page.$$('form button')

        await button[0].click()

        await this.page.waitForNavigation({
          waitUntil: 'networkidle2'
        })

        await this.page.screenshot({ path: 'login-fail-3.png' })

        await this.page.waitFor("input[placeholder='Search']")

        console.log('Logged in successfully')

        this.processing = false
      }
    }
  }

  async getGraphQLData (username) {
    this.processing = true
    await this.page.goto(`https://www.instagram.com/${username}/?__a=1`, { waitUntil: 'networkidle0' })
    const data = await this.page.evaluate(() => document.querySelector('pre').innerHTML)
    const instadata = JSON.parse(data)
    this.processing = false
    return instadata
  }

  async getProfilePicture (username) {
    this.processing = true
    await this.page.goto(`https://www.instagram.com/${username}`, { waitUntil: 'networkidle0' })
    const usernamePictureUrl = await this.page.evaluate(() => {
      return document.querySelectorAll('header img')[0].getAttribute('src')
    })
    this.processing = false
    return usernamePictureUrl
  }

  async destroy () {
    this.processing = false
    await this.browser.close()
  }
}

class CrawlerManager {
  constructor () {
    this.crawlers = [
      new InstagramCrawler()
    ]
  }

  async getCrawler () {
    console.log("Finding free crawler")
    const crawlerIdx = this.crawlers.findIndex(c => !c.processing)
    console.log("Free crawler index: " + crawlerIdx)
    let crawler = this.crawlers[crawlerIdx]
    if (!crawler) {
      console.log("Crawler not found. Init another crawler")
      crawler = new InstagramCrawler()
      this.crawlers.push(crawler)
      await crawler.init()
      return { crawler, crawlerIdx: this.crawlers.length - 1 }
    } else {
      console.log("Crawler found")
      if (!crawler.page) {
        console.log("Crawler not inited Initing...")
        await crawler.init()
      }
      return { crawler, crawlerIdx }
    }
  }

  async getInstaInfo (username) {
    const { crawler, crawlerIdx } = await this.getCrawler()
    const instadata = await crawler.getGraphQLData(username)
    console.log('Instadata for ' + username, instadata)
    if (!instadata || !instadata.graphql || !instadata.graphql.user) {
      return null
    }
    const pictureUrl = await crawler.getProfilePicture(username)
    console.log('Picture Url: ', pictureUrl)
    instadata.graphql.user.profile_pic_url = pictureUrl
    if (this.crawlers.length >= 2) {
      console.log(' More than two crawlers exist Destroying...')
      this.crawlers.splice(crawlerIdx, 1)
      await crawler.destroy()
    } else {
      console.log('Crawler length is only one. Do not destroy')
    }
    return instadata
  }

  async getInstaInfoRaw (username) {
    const { crawler, crawlerIdx } = await this.getCrawler()
    const instadata = await crawler.getGraphQLData(username)
    console.log('Instadata for ' + username, instadata)
    if (this.crawlers.length >= 2) {
      console.log(' More than two crawlers exist Destroying...')
      this.crawlers.splice(crawlerIdx, 1)
      await crawler.destroy()
    } else {
      console.log('Crawler length is only one. Do not destroy')
    }
    return instadata
  }

}

const crawler = new CrawlerManager()

module.exports = crawler
