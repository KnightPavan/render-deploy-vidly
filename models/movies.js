import mongoose from 'mongoose'
import Joi from 'joi'
import { genreSchema } from '../models/genres.js'

const moviesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true },
  genre: genreSchema
})

const Movie = mongoose.model('movies', moviesSchema)

function validateInput (movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(15).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
    genreId: Joi.string().required()
  })
  return schema.validate(movie)
}

export { Movie, validateInput }
