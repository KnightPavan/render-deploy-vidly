import express from 'express'
import { Customer, validateInput } from '../models/customer.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  })
  customer = await customer.save()
  res.send(customer)
})

router.put('/:id', async (req, res) => {

  console.log(req.baseUrl)
  let customer = await Customer.findById(req.params.id)
  if (!customer) return res.status(404).send('No such resource found')

  const { error } = validateInput(req.body)

  if (error) return res.status(400).send(error.details[0].message)
  customer.name = req.body.name
  customer.isGold = req.body.isGold
  customer.phone = req.body.phone
  customer = await customer.save()
  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id)
  if (!customer) return res.status(404).send('No such resource found')
  res.send(customer)
})

export { router as customers }
