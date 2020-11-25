const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cfg = require('../config')

const app = express()

MongoClient.connect(cfg.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err) throw err
    app.locals.db = client.db(cfg.dbName)
} )

app.use(express.json({ limit: '1mb'}))

module.exports = app