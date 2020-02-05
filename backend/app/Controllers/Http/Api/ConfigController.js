'use strict'

const Config = use('App/Models/Config')

class ConfigController {

  async index({ request, auth, response }) {
    const config = await Config.first()
    config.paypal_client = use('Env').get('PAYPAL_CLIENT')
    config.paypal_secret = use('Env').get('PAYPAL_SECRET')
    return response.apiItem(config)
  }

  async store({request, auth, response}) {
    let config = await Config.first()
    config.merge(request.only(['charge', 'seller', 'order']))
    await config.save()
    return response.apiUpdated(config)
  }

}

module.exports = ConfigController
