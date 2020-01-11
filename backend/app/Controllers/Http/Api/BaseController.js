'use strict'
const Validator = use('Validator')
const ValidateErrorException = use('App/Exceptions/ValidateErrorException')
const _ = require('lodash')
const Env = use('Env')
const Config = use('Config')

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

  getSiteConfig() {
    if (this.isDevelopment()) {
      return {
        "charge": {
          "commission": 5 // percent
        },
        "seller": {
          "minimum_followers": 10000 // any instagram account is accepted
        },
        "order": {
          "time_margin": {
            "start_from": 10000, // order start_from must be at least 10s later from now
            "accept": 30000, // seller must accept a shoutout in 30s
            "start_time": Infinity, // seller can start a shoutout at anytime
          }
        }
      }
    } else {
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
          }
        }
      }
    }

  }
}

module.exports = BaseController
