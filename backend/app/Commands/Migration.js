'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const validators = require(`${use('Helpers').appRoot()}/database/validators`)

class Migration extends Command {
  static get signature () {
    return 'migrate'
  }

  static get description () {
    return 'Do migration'
  }

  async handle (args, options) {
    const db = await Database.connect('mongodb')
    try {
      await db.dropCollection('users')
    } catch (e) {
      console.log('collection users not exists')
    }

    await db.createCollection('users', validators.UserValidator)
    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    this.info('collection users created')

    try {
      await db.dropCollection('instaaccounts')
    } catch (e) {
      console.log('collection instaaccounts not exists')
    }

    await db.createCollection('instaaccounts', validators.InstaValidator)
    // await db.collection('instaaccounts').createIndex({"username": 1}, { unique: true })
    this.info('collection instaaccounts created')

    try {
      await db.dropCollection('orders')
    } catch (e) {
      console.log('collection orders not exists')
    }

    await db.createCollection('orders', validators.OrderValidator)
    this.info('collection orders created')

    try {
      await db.dropCollection('transactions')
    } catch (e) {
      console.log('collection transactions not exists')
    }

    await db.createCollection('transactions')
    this.info('collection transactions created')

    try {
      await db.dropCollection('admin')
    } catch (e) {
      console.log('collection admin not exists')
    }

    await db.createCollection('admin')
    this.info('collection admin created')
    this.success('migration completed')
  }
}

module.exports = Migration
