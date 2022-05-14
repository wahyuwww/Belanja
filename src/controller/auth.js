
const { authModel } = require('../model/auth')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const authHelper = require('../helpers/auth')
const { sendMail } = require('../helpers/sendEmail')
const nodemailer = require('nodemailer')

const authController = {
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const {
        rows: [user]
      } = await authModel.FindEmail(email)
      if (!user) {
        return commonHellper.response(
          res,
          null,
          'data yang anda inputkan salah',
          200
        )
      }
      const invalidPassword = bcrypt.compareSync(password, user.password)
      // console.log(invalidPassword)
      if (!invalidPassword) {
        return commonHellper.response(
          res,
          null,
          'data yang anda inputkan salah',
          200
        )
      }
      delete user.password
      const payload = {
        email: user.email,
        role: user.role,
        name: user.name
      }
      user.token = authHelper.generateToken(payload)
      // const token = jwt.sign(payload, process.env.SECRET_KEY, {
      //   expiresIn: '1h'
      // })
      // console.log(user.role)
      const data = {
        email,
        token: user.token
      }
      user.refreshToken = await authHelper.generateRefreshToken(payload)
      console.log(user.refreshToken)
      commonHellper.response(res, data, 'anda berhasil login bro', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password, name, role, phonenumber } = req.body
      // console.log(name)
      const salt = bcrypt.genSaltSync(10)
      const passwrodHash = bcrypt.hashSync(password, salt)
      console.log(passwrodHash)
      const data = {
        id: uuidv4(),
        email,
        password: passwrodHash,
        name,
        role,
        phonenumber
      }
      console.log(data)
      const { rowCount } = await authModel.FindEmail(email)
      if (rowCount) {
        return commonHellper.response(
          res,
          null,
          'Uppsstt email sudah ada',
          200
        )
      }
      await authModel.create(data)
      sendMail(email)
      commonHellper.response(
        res,
        {
          id: uuidv4(),
          email,
          name,
          role,
          phonenumber
        },
        'Register Success',
        200
      )
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  profil: async (req, res, next) => {
    try {
      const email = req.decoded.email
      const {
        rows: [user]
      } = await authModel.FindEmail(email)
      const data = {
        name: user.name,
        email: user.email,
        phone_number: user.phonenumber
      }
      delete user.password
      // commonHellper.response(res, user, 'Uppsstt email sudah ada', 200)
      commonHellper.response(
        res,
        data,
        `anda berada di profil ${user.name}`,
        200
      )
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.body.refreshToken
      // console.log(refreshToken)
      const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY)
      console.log(decoded)
      const newPayload = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
      // Wahyu2508,.
      // console.log(newDataPayload)
      //  user.token = authHelper.generateToken(payload);
      const newToken = await authHelper.generateToken(newPayload)
      const newRefreshToken = await authHelper.generateRefreshToken(newPayload)
      const result = {
        token: newToken,
        refreshToken: newRefreshToken
      }
      commonHellper.response(res, result, 'data berhasil di refresh', 200)
    } catch (error) {
      console.log(error)
      if (error && error.name === 'TokenExpiredError') {
        next(createError(400, 'token expired'))
      } else if (error && error.name === 'JsonWebTokenError') {
        next(createError(400, 'token invalid'))
      } else {
        next(createError(400, 'token not active'))
      }
      // helpers.response(res, {message: 'Internal Server Error'}, 500)
    }
  },
  sendEmail: (req, res) => {
    authModel
      .sendEmail(req.body)
      .then((data) => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'wahyu.purwanto258@gmail.com', // generated ethereal user
            pass: 'purwanto2508' // generated ethereal password
          }
        })

        const mailOptions = {
          from: 'wahyu.purwanto258@gmail.com',
          to: data.email,
          subject: 'Reset Password',
          text: `Link to reset password : ${data.link}`
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
        commonHellper.response(res, data, 'data berhasil di refresh', 200)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  activasi: async (req, res, next) => {
    try {
      const id = req.params.id
      // const id = req.query.id
      console.log(id)
      const result = await authModel.activasi(id)
      console.log(result)
      commonHellper.response(
        res,
        result,
        'get data success dari database',
        200
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  authController
}

// psql -U onlkzldnzrwziz -h ec2-34-236-94-53.compute-1.amazonaws.com -p 5432 -d d3hm1aund71eem


// ALTER TABLE users
// ADD role AS enum ('admin','user');