const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const buttonRouter = require('./controllers/buttonCtrl')
const userRouter = require('./controllers/userCtrl')

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('build'))

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
app.use('/api/user', userRouter)

module.exports = app