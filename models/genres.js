import Joi from "joi"
import mongoose from "mongoose"

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  }
})

const Genre = mongoose.model('genres', genreSchema)

function validateInput (genre) {
  const schema = Joi.object({ name: Joi.string().min(3).required() })
  return schema.validate(genre)
}

export { Genre, validateInput, genreSchema }
