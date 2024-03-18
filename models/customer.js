import mongoose from 'mongoose'
import Joi from 'joi'

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    minlength: 10
  }
})

const Customer = mongoose.model('customers', customerSchema)

function validateInput (genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(10).required()
  })
  return schema.validate(genre)
}

export {Customer, validateInput}