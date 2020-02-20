const buttonRouter = require('express').Router()

const Button = require('../models/button')

buttonRouter.get('/', async (req, res) => {
  const info = await Button.find({})
  res.json(info)
})

buttonRouter.post('/', async(req, res) => {
  const button = new Button({count: 0, lastToken: "start", id: 1})
  const result = await button.save()

  res.status(201).json(result)
  
})

buttonRouter.delete('/', async(req, res) => {
  const res2 = await Button.remove({})
  res.status(201).json(res2)
})

buttonRouter.put('/', async (request, response) => {
  const count = await Button.find({id: 1})
  const newCount = count[0].count +1
  const newToken = request.body.token
  
  const updatedCount = {
    _id: count[0]._id,
    count: newCount,
    lastToken: newToken,
    id: 1,
    __v: 0
  }

  const result = await Button.findOneAndUpdate({id: 1}, updatedCount)
  response.json(updatedCount)
})

module.exports = buttonRouter