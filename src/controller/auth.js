/* eslint-disable camelcase */

const { authModel } = require('../model/auth')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')
// const jwt = require('jsonwebtoken')

const authController = {
  loginUser: (req, res, next) => {
    authModel
      .loginUser(req.body)
      .then((result) => {
        res.status(200).json({
          msg: 'berhasil login',
          result
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },

  register: (req, res) => {
    const { email, password, name, phone_number } = req.body
    console.log(name)
    const data = {
      email,
      password,
      name,
      phone_number
    }
    authModel
      .postNewUser(data)
      .then((data) => {
        commonHellper.response(res, data, 'Register Success', 200)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = {
  authController
}