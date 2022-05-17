
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
      console.log(user)
      if (!user) {
        return res.json({
          message: 'data yang anda inputkan salah'
        })
      }
      const invalidPassword = bcrypt.compareSync(password, user.password)
      // console.log(password)
      if (!invalidPassword) {
        return res.json({
          message: ' data yang anda inputkan salah'
        })
      }
      if (user.active === '0') {
        return res.json({
          message: ' anda belum verifikasi'
        })
      }
      delete user.password
      const payload = {
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.active
      }
      user.token = authHelper.generateToken(payload)
      const newRefreshToken = await authHelper.generateRefreshToken(payload)
      const data = {
        email,
        token: user.token,
        refreshToken: newRefreshToken
      }
      commonHellper.response(res, data, 'selemat anda berhasil login', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password, name, role } = req.body
      const salt = bcrypt.genSaltSync(10)
      const passwrodHash = bcrypt.hashSync(password, salt)
      const data = {
        id: uuidv4(),
        email,
        password: passwrodHash,
        name,
        role: role || 'user',
        active: 0
      }
      console.log(data)
      const { rowCount } = await authModel.FindEmail(email)
      if (rowCount) {
        return next(createError(403, 'user sudah terdaftar'))
      }
      await authModel.create(data)
      sendMail({ email, name, role })
      commonHellper.response(
        res,
        {
          id: uuidv4(),
          email,
          name,
          role: role || 'users'
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
      const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY)
      console.log(decoded)
      const newPayload = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
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
    }
  },
  sendEmail: (req, res, next) => {
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
        next(createError)
      })
  },
  activasi: async (req, res, next) => {
    try {
      const token = req.params.token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY)
      console.log(decoded)
      const data = {
        active: 1,
        email: decoded.email,
        role: decoded.role
      }

      await authModel.activasi(data)
      const newPayload = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
      console.log(newPayload)
      // const newRefreshToken = await authHelper.generateRefreshToken(newPayload)
      if (decoded.status === '1') {
        return res.json({ message: 'akun anda sudah terverifikasi' })
      }
      const result = {
        email: decoded.email,
        name: decoded.name
        // tokenNew: newRefreshToken
      }
      commonHellper.response(res, result, 'akun done verifikasi, silahkan login', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  changePassword: (req, res, next) => {
    authModel
      .changePassword(req.body)
      .then(() => {
        res.json({
          message: 'berhasil diganti'
        })
      })
      .catch((_error) => {
        next(createError)
      })
  },
  cekActivasi: async (req, res, next) => {
    try {
      const token = req.params.token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY)
      const newPayload = {
        email: decoded.email
      }
      commonHellper.response(
        res,
        newPayload,
        'akun anda dengan belum terverifikasi',
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

// psql -U dnymxhsatwjxce -h ec2-52-4-104-184.compute-1.amazonaws.com -p 5432 -d dd7rboub6u32p5

// ALTER TABLE users
// ADD role AS enum ('admin','user');

// heroku log --tail
// pg_dump -U postgres -h 127.0.0.1 web2 > web2.pqsql
