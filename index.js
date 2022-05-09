require('dotenv').config()
// peckage
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const CreateError = require('http-errors')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
// routing
const categoryRouter = require('./src/route/category')
const productsRouter = require('./src/route/product')
const transactionRouter = require('./src/route/transaction')
const authController = require('./src/route/auth')
const usersRouter = require('./src/route/users')
const reviewRouter = require('./src/route/review')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(xss())
app.disable('x-powered-by')

app.use('/category', categoryRouter)
app.use('/products', productsRouter)
app.use('/transaction', transactionRouter)
app.use('/users', usersRouter)
app.use('/auth', authController)
app.use('/review', reviewRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`example app listening at http://localhost:${PORT}`)
})
app.all('*', (req, res, next) => {
  next(new CreateError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})
