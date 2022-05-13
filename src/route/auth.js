const express = require('express')
const Router = express.Router()
const { authController } = require('../controller/auth')
// const { usersController } = require('../controller/users')
const { protect } = require('../middleware/auth')

Router.post('/login', authController.loginUser)
  .post('/register', authController.register)
  .get('/profile', protect, authController.profil)
  .post('/refreshtoken', authController.refreshToken)
  .get('/activasi/:token', authController.activasi)
  .post('/sendEmail', authController.sendEmail)
module.exports = Router
