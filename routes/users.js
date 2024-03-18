import express from 'express'
import { User, validateInput } from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered')
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })

  user = await user.save()
  const token = jwt.sign({ _id: user._id, isAdmin : user.isAdmin }, 'myPrivateKey')

  res.header('x-auth-token', token).send({
    name: user.name,
    email: user.email,
    id: user._id
  })
})

export { router as users }
