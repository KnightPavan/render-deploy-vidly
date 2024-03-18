import mongoose from 'mongoose'
import Joi from 'joi'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: Boolean
})
const User = mongoose.model('users', userSchema)

function validateInput (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(2).email().required(),
    password: Joi.string().min(8).required()
  })
  return schema.validate(user)
}

export { User, validateInput }
