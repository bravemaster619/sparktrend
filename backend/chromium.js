const prompts = require('prompts')
const puppeteer = require('puppeteer')

const username = 'Sparktrend.sa'
const password = 'aHy-rwq-X6Z-2XK'

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class InstagramCrawler {
  constructor () {
    this.browser = null
    this.page = null
  }

  async init () {
    console.log('---Starting headless browser---')
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
    console.log('Browser launched')
    this.page = await this.browser.newPage()
    console.log('Navigate to instagram login page')
    await this.page.goto('https://www.instagram.com/accounts/login/')
    await this.page.waitForSelector('input[name="username"]')
    await this.page.type('input[name="username"]', username)
    await this.page.type('input[name="password"]', password)
    await this.page.click('button[type="submit"]')
    console.log('Clicked login button')
    try {
      await this.page.waitForSelector('[placeholder=Search]', {
        timeout: 5000
      })
      console.log('Logged in successfully')
    } catch (e) {
      console.log('Warning: login first try failed. Might require email verification')

      await this.page.screenshot({path: 'login-fail.png'})

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

        await this.page.screenshot({path: 'login-fail-2.png'})

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
        
        await this.page.screenshot({path: 'login-fail-3.png'})

        await this.page.waitFor("input[placeholder='Search']")

        console.log('Logged in successfully')
      }
    }
  }
}

const crawler = new InstagramCrawler()

module.exports = crawler
