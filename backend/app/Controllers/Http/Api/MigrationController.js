const BaseController = require('./BaseController')
const Database = use('Database')
const validators = require(`${use('Helpers').appRoot()}/database/validators`)

class MigrationController extends BaseController {

  async migrate({request, response}) {
    const db = await Database.connect('mongodb')
    try {
      await db.dropCollection('users')
    } catch(e) {
      console.log('collection users not exists')
    }

    await db.createCollection('users', validators.UserValidator)

    console.log('collection users created')

    try {
      await db.dropCollection('instaaccounts')
    } catch(e) {
      console.log('collection instaaccounts not exists')
    }

    await db.createCollection('instaaccounts', validators.InstaValidator)
    console.log('collection instaaccounts created')

    try {
      await db.dropCollection('orders')
    } catch(e) {
      console.log('collection orders not exists')
    }

    await db.createCollection('orders', validators.OrderValidator)
    console.log('collection orders created')

    return response.json({
      success: true
    })
  }

}

module.exports = MigrationController;
