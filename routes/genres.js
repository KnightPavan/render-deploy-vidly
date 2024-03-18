import express from 'express'
import { Genre, validateInput } from '../models/genres.js'
import { auth } from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

// const genres = [{ id: 1, genre: 'Action' }]

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 })
  res.send(genres)
})

router.get('/:id', async (req, res) => {
  // const genre = genres.find(val => val.id == req.params.id)
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('No such resource found')
  res.send(genre)
})

router.put('/:id', async (req, res) => {
  // const genre = genres.find(val => val.id == parseInt(req.params.id))
  console.log(req.baseUrl)
  let genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('No such resource found')

  const { error } = validateInput(req.body)

  if (error) return res.status(400).send(error.details[0].message)
  genre.name = req.body.name
  genre = await genre.save()
  res.send(genre)
})

router.post('/', auth, async (req, res) => {
  const { error } = validateInput(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  // const genre = { id: genres.length + 1, genre: req.body.genre }
  let genre = new Genre({
    name: req.body.name
  })
  // genres.push(genre)
  genre = await genre.save()
  res.send(genre)
})

router.delete('/:id', [auth, admin],async (req, res) => {
  // const genre = genres.find(val => val.id == parseInt(req.params.id))
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if (!genre) return res.status(404).send('No such resource found')

  // const index = genres.indexOf(genre)
  // genres.splice(index, 1)
  res.send(genre)
})

export { router as genres }
