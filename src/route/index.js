const categoryRouter = require('./category')
const productsRouter = require('./product')
const transactionRouter = require('./transaction')
const authController = require('./auth')
const usersRouter = require('./users')
const reviewRouter = require('./review')
const express = require('express')
const Router = express.Router()

Router.use('/category', categoryRouter)
  .use('/products', productsRouter)
  .use('/transaction', transactionRouter)
  .use('/users', usersRouter)
  .use('/auth', authController)
  .use('/review', reviewRouter)

module.exports = Router
