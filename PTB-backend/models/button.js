const mongoose = require('mongoose') 

const buttonSchema = mongoose.Schema({
  count: Number,
  lastToken: String,
  id: Number
})

buttonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Button = mongoose.model('Button', buttonSchema)

module.exports = Button