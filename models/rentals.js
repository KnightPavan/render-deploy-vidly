import mongoose from 'mongoose'
import Joi from 'joi'

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: { type: String, required: true },
      dailyRentalRate: { type: Number, required: true }
    }),
    required: true
  },
  dataOut: {
    type: Date,
    default: Date.now(),
    required: true
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
})

const Rental = mongoose.model('rentals', rentalSchema)

function validateRental (rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.string().required()
  })

  return schema.validate(rental)
}

export { validateRental, Rental }
