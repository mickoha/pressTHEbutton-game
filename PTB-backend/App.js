const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const buttonRouter = require('./controllers/buttonCtrl')

app.use(cors())
app.use(bodyParser.json())

console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((e) => {
    console.log('error connection to MongoDB: ' , e.message)
  })

mongoose.set('useFindAndModify', false)

app.use('/api/button', buttonRouter)

module.exports = app