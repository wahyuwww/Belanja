require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const CreateError = require('http-errors')
const categoryRouter = require('./src/route/category')
const productsRouter = require('./src/route/product')
const transactionRouter = require('./src/route/transaction')
const authController = require('./src/route/auth')
const usersRouter = require('./src/route/users')
const reviewRouter = require('./src/route/review')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(xss())
const PORT = 4000
app.listen(PORT, () => {
  console.log(` port ini adalah ${PORT}`)
})

// const db = process.env.DB_DATABASE
// console.log(db)
app.use('/category', categoryRouter)
app.use('/products', productsRouter)
app.use('/transaction', transactionRouter)
app.use('/users', usersRouter)
app.use('/auth', authController)
app.use('/review', reviewRouter)

app.all('*', (req, res, next) => {
  next(new CreateError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.message || 500

  res.status(statusCode).json({
    message: messError
  })
})
