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
  const id = req.params.id
  const pointshange = req.body.points

  const updatedPoints = await User 
    .findByIdAndUpdate(id, {points: points + pointshange})
})

module.exports = userRouter