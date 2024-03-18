import express from 'express'
import { genres } from './routes/genres.js'
import { customers } from './routes/customers.js'
import { movies } from './routes/movies.js'
import { rentals } from './routes/rentals.js'
import mongoose from 'mongoose'
import { users } from './routes/users.js'
import { auth } from './routes/auth.js'

mongoose
  .connect('mongodb+srv://knightpavan75:PaVaN12345@cluster0.l43ftrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3030
const ip = 'localhost'

app.listen(port, () => {
  console.log(`Listening to ${ip}:${port}`)
})
