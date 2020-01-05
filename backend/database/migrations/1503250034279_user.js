'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('email', 191).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('country', 191).notNullable()
      table.string('gender', 20)
      table.string('paypal_email', 191)
      table.datetime('email_verified_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
