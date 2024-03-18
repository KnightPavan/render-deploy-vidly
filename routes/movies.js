import express from 'express'
import Joi from 'joi'
import { Movie, validateInput } from '../models/movies.js'
import { Genre } from '../models/genres.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid Genre')

  let movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  })

  movie = await movie.save()
  res.send(movie)
})

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort({ name: 1 })
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const movie = await movie.findById(req.params.id)
  if (!movie) return res.status(404).send('No such resource found')
  res.send(movie)
})

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id)
  if (!movie) return res.status(404).send('No such resource found')
  res.send(movie)
})

router.put('/:id', async (req, res) => {
  let movie = await Movie.findById(req.params.id)
  if (!movie) return res.status(404).send('No such resource found')

  const { error } = validateInput(req.body)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid Genre')

  if (error) return res.status(400).send(error.details[0].message)
  movie.title = req.body.title
  movie.numberInStock = req.body.numberInStock
  movie.dailyRentalRate = req.body.dailyRentalRate
  movie.genre._id = req.body.genreId
  movie.genre.name = genre.name
  movie = await movie.save()
  res.send(movie)
})

export { router as movies }
