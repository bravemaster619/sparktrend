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


}

module.exports = BaseController
