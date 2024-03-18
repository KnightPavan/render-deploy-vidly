import express from 'express'
import { User } from '../models/users.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password')

  const token = jwt.sign({ _id: user._id, isAdmin : user.isAdmin }, 'myPrivateKey')
  res.send(token)
})

async function validateInput (auth) {
  const schema = Joi.object({
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(8).required()
  })
  return schema.validate()
}
export { router as auth }
