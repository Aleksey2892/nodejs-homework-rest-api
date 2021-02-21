const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join('./model', './contacts.json'))
const db = low(adapter)

module.exports = db
