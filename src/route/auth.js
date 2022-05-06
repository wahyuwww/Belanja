const express = require('express')
const Router = express.Router()
const { authController } = require('../controller/auth')

Router
  .post('/loginUser', authController.loginUser)
  .post('/register', authController.register)
module.exports = Router
