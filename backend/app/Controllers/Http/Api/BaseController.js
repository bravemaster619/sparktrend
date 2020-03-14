'use strict'
const Validator = use('Validator')
const ValidateErrorException = use('App/Exceptions/ValidateErrorException')
const _ = require('lodash')
const Env = use('Env')
const Config = use('App/Models/Config')

class BaseController {
  async validate (data, rules, messages) {
    const validation = await Validator.validateAll(data, rules, messages)
    if (validation.fails()) {
      throw ValidateErrorException.invoke(validation.messages())
    }
  }

  async validateAttributes (data, rules, messages) {
    rules = _.pick(rules, _.keys(data))
    await this.validate(data, rules, messages)
  }

  isDevelopment ()  {
    return Env.get('NODE_ENV', 'development') === 'development'
  }

  isProduction () {
    return Env.get('NODE_ENV', 'development') === 'production'
  }

  baseUrl () {
    return Config.get('app.baseUrl')
  }

  async getSiteConfig() {

    if (this.isDevelopment()) {
      return {
        "charge": {
          "commission": 5
        },
        "seller": {
          "minimum_followers": 10000 // sellers should have more than 10K followers
        },
        "order": {
          "time_margin": {
            "start_from": 2 * 24 * 3600 * 1000, // order start_from must be at least 2 days later from now
            "accept": 3 * 24 * 3600 * 1000, // seller must accept a shoutout in 3 days
            "start_time": 30 * 60 * 1000, // seller must start a shoutout in +/- 30 minutes from start_time
            "complete": 24 * 3600 * 1000 // seller must report completion of a shoutout in 24 hours from deadline
          }
        }
      }
    } else {
      return await Config.first()
    }

  }
}

module.exports = BaseController
