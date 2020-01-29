require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
// const client = new MongoClient(process.env.DB_CONNECTION_STRING)

MongoClient.connect(process.env.DB_CONNECTION_STRING).then(client => {
  console.log("Connected to MongoDB...")
  rejectOrders(client.db('sparktrade')).then(() => {
    expireOrders(client.db('sparktrade')).then(() => {
      client.close()
      process.exit()
    })
  })
}).catch(err => {
  console.log(err)
  process.exit()
})

const rejectOrders = (db, callback) => {
  const now = new Date
  return db.collection('config').findOne().then(config => {
    db.collection('orders').updateMany({
      "history.created_at": {$exists: true},
      "history.accepted_at": null,
      "history.rejected_at": null,
      "history.refunded_at": null,
      "request_expiry": {$lte: now}
    }, {
      $set: {
        "history.rejected_at": now
      }
    }).then((result) => {
      console.log(`Rejected ${result.result.nModified} order(s).`)
    }).catch(err => {
      console.error(err)
    })
  }).catch(err => {
    console.log("Cannot load config in database")
    console.error(err)
  })
}
const expireOrders = (db, callback) => {
  const now = new Date
  return db.collection('orders').updateMany({
    "history.created_at": {$exists: true},
    "history.expired_at": null,
    "history.completed_at": null,
    "history.refunded_at": null,
    "deadline": {$lte: now}
  }, {
    $set: {
      "history.expired_at": now
    }
  }).then(result => {
    console.log(`Expired ${result.result.nModified} order(s).`)
  }).catch(err => {
    console.error(err)
  })
}
