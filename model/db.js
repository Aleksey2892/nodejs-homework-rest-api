require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const DB_CONNECT = process.env.DB_CONNECT

const db = MongoClient.connect(DB_CONNECT, { useUnifiedTopology: true })

process.on('SIGINT', async () => {
  await db.close()
  console.log('db connection is closed')
  process.exit(1)
})

module.exports = db
