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
  const updatedPoints = await User 
    .findByIdAndUpdate(req.params.id, {points: req.body.points})

  res.json(updatedPoints)
})

module.exports = userRouter