const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const cfg = require('../config')

const { todosRouter } = require('./routes/todos')

const app = express()

MongoClient.connect(cfg.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err) throw err
    app.locals.db = client.db(cfg.dbName)
} )

app.use(cors())
app.use(logger('dev'))
app.use(express.json({ limit: '1mb'}))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false}))

app.use('/todos', todosRouter)

module.exports = app
