'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const validators = require(`${use('Helpers').appRoot()}/database/validators`)
const Hash = use('Hash')

class Seed extends Command {
  static get signature () {
    return 'seeddb'
  }

  static get description () {
    return 'Do seed'
  }

  async handle (args, options) {
    const db = await Database.connect('mongodb')
    // ------------------ BEGIN USER SEED ----------------------
    await db.collection('users').remove({})
    const admin = await db.collection('users').insert({
      name: 'Shaheen Almutairi',
      email: 'magic-pro-898@hotmail.com',
      password: await Hash.make('Aadmin898'),
      country: 'Italy',
      gender: 'male',
      locale: 'ar',
      role: 'admin',
      verified: true,
      created_at: new Date(),
      updated_at: new Date()
    })
    console.log('admin user inserted')
    const user1 = await db.collection('users').insert({
      name: 'bravemaster',
      email: 'bravemaster619@hotmail.com',
      password: await Hash.make('111111'),
      country: 'China',
      gender: 'male',
      locale: 'en',
      role: 'user',
      verified: true,
      paypal_email: 'sb-ictjo870631@personal.example.com',
      created_at: new Date(),
      updated_at: new Date()
    })
    const user2 = await db.collection('users').insert({
      name: 'devcrazy',
      email: 'devcrazy@hotmail.com',
      password: await Hash.make('111111'),
      country: 'China',
      gender: 'male',
      locale: 'en',
      role: 'user',
      verified: true,
      paypal_email: 'sb-1swn0866533@personal.example.com',
      created_at: new Date(),
      updated_at: new Date()
    })
    console.log('two users inserted')
    // ------------------  END USER SEED  ----------------------
    // ------------------ BEGIN INSTAACCOUNT SEED ---------------------
    await db.collection('instaaccounts').remove({})
    await db.collection('instaaccounts').insert({
      user_id: user1.insertedIds['0'],
      username: 'instafashionfeeds',
      profile_img: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/18380890_110724382837223_774891342345011200_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=U7n98U2i0OoAX8BMvzo&oh=7b89d55f19d64f55b9f1a7b139ea47b9&oe=5E8D5BFA',
      follower_count: 332097,
      insights_picture: 'https://cdn.skedsocial.com/wp-content/uploads/2018/03/25141444/Screen-Shot-2018-03-25-at-10.12.28-PM.png',
      verification_code: 'd73238e0',
      verified: true,
      allowed: true,
      type: 'business',
      demographics: {
        age: [
          { name: '13-17', percent: 12 },
          { name: '18-24', percent: 45 },
          { name: '25-34', percent: 27 },
          { name: '35-44', percent: 10 },
          { name: '45-54', percent: 4 },
          { name: '55-64', percent: 1 },
          { name: '65+', percent: 1 }
        ],
        gender: [
          { name: 'Men', percent: 85 },
          { name: 'Women', percent: 15 }
        ],
        country: [
          { name: 'United States', percent: 37 },
          { name: 'India', percent: 7 },
          { name: 'United Kingdom', percent: 5 },
          { name: 'Indonesia', percent: 3 },
          { name: 'Brazil', percent: 2 }
        ]
      },
      product: {
        description: 'A stunningly beautiful page with a constant growth of followers, etc. ❤',
        banner_img: 'https://tse3-mm.cn.bing.net/th/id/OIP.jNCbt_c_8vnq7sbWluCVnQHaCG?w=300&h=85&c=7&o=5&pid=1.7',
        niches: 'Fashion & Style',
        categories: [
          {
            type: 'Single',
            pricing: [
              { time: 6, price: 15, bio_price: 10 },
              { time: 12, price: 20, bio_price: 10 }
            ]
          },
          {
            type: 'Multiple',
            pricing: [
              { time: 12, price: 30.5, bio_price: 15 }
            ]
          },
          {
            type: 'Story',
            pricing: [
              { time: 24, price: 40, bio_price: 20 }
            ]
          }
        ]
      },
      created_at: new Date(),
      updated_at: new Date()
    })
    console.log('one instagram account inserted')
    // ------------------  END INSTAACCOUNT SEED  ---------------------
    // --------------- BEGIN SITE CONFIG SEED ------------------
    await db.collection('config').remove({})
    await db.collection('config').insert({
      charge: {
        commission: 5, // commission fee percentage
        referrer: 10
      },
      seller: {
        minimum_followers: 10000 // sellers should have more than 10K followers
      },
      order: {
        time_margin: {
          start_from: 2 * 24 * 3600 * 1000, // order start_from must be at least 2 days later from now
          accept: 2 * 24 * 3600 * 1000, // seller must accept a shoutout in 2 days
          start_time: 24 * 3600 * 1000, // seller must start a shoutout in a day from start_time
          complete: 24 * 3600 * 1000 // seller must report completion of a shoutout in 24 hours from deadline
        }
      }
    })
    this.success('seed completed')
    // ---------------  END SITE CONFIG SEED  ------------------
  }
}

module.exports = Seed
