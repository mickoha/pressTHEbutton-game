const userRouter = require('express').Router()

const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})



userRouter.post('/', async (req, res) => {
  const newUser = new User(req.body)
  const result = await newUser.save()

  res.status(201).json(result)
})

userRouter.put('/:id', async (req, res) => {
  const user = {
    ...req.body
  }
  const updatedPoints = await User 
    .findOneAndUpdate({_id: req.params.id}, user)

  res.json(user)
})

module.exports = userRouter