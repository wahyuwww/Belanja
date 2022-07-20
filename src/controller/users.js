/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const { modelUsers } = require('../model/users')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const cloudinary = require('../helpers/cloudinary')

const usersController = {
  getUsers: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1)
      // console.log(page)
      const limit = parseInt(req.query.limit || 5)
      const offset = (page - 1) * limit

      const result = await modelUsers.select({ limit, offset })
      const {
        rows: [count]
      } = await modelUsers.countUsers()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      // console.log(limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHellper.response(res, result, 'get data success', 200, pagination)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  // getTransactionsById: async (req, res, next) => {
  //   try {
  //     const id = req.params.id
  //     // console.log(id)
  //     const result = await modelUsers.getProductById(id)
  //     commonHellper.response(res, result.rows, 'get data success', 200)
  //   } catch (error) {
  //     console.log(error)
  //     next(createError)
  //   }
  // },
  getUsersByFilter: async (req, res, next) => {
    try {
      const sort = req.query.sort
      const type = req.query.type
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      console.log(type)
      const result = await modelUsers.filterUsers({
        sort,
        type,
        limit,
        offset
      })
      const {
        rows: [count]
      } = await modelUsers.countUsers()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }
      commonHellper.response(res, result.rows, `get data by filter ${sort}`, 200, pagination)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSearchUsers: (req, res, next) => {
    const search = req.query.search
    console.log(search)
    modelUsers
      .searchUsers(search)
      .then((result) => {
        res.json({
          data: result.rows
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  createUsers: (req, res, next) => {
    const { name, password, email, role, store_name, store_description } =
      req.body

    const data = {
      name,
      password,
      email,
      role,
      store_name,
      store_description
    }
    // console.log(data)
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        // console.log(data)
        modelUsers
          .insert({ ...data })
          .then(() => {
            commonHellper.response(res, data, 'get data success', 200)
          })
          .catch((error) => {
            console.log(error)
            next(createError)
          })
      })
    })
  },
  update: async (req, res, next) => {
    const {
      name,
      password,
      email,
      phonenumber,
      gender,
      date_of_brith,
      address,
      role,
      image
    } = req.body
    const data = {
      name,
      password,
      email,
      phonenumber,
      gender,
      date_of_brith,
      address,
      role,
      image
    }
    const id = req.params.id
    console.log(data)
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        // console.log(data)
        modelUsers
          .update({ ...data, id })
          .then((result) => {
            commonHellper.response(res, data, 'data updated success', 200)
          })
          .catch((error) => {
            console.log(error)
            next(createError)
          })
      })
    })
  },
  deleteUsers: (req, res, next) => {
    const id = req.params.id
    // const name = req.body.name
    modelUsers
      .deleteUsers(id)
      .then(() => {
        res.status(200).json({
          message: 'deleted success',
          data: `id : ${id}`
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  // updateProfil: async (req, res, next) => {
  //   try {
  //     const token = req.headers.authorization.split(' ')[1]
  //     const decoded = await jwt.verify(token, process.env.SECRET_KEY)
  //     console.log(decoded)
  //     const {
  //       name,
  //       email,
  //       gender,
  //       dateofbrith,
  //       image,
  //       address,
  //       password,
  //       phonenumber
  //     } = req.body
  //     const data = {
  //       name,
  //       email,
  //       address,
  //       password,
  //       phonenumber,
  //       gender,
  //       dateofbrith,
  //       image
  //     }
  //     console.log(data)
  //     await modelUsers.updateProfil(data)
  //     const newPayload = {
  //       email: decoded.email,
  //       name: decoded.name,
  //       role: decoded.role
  //     }
  //     commonHellper.response(res, newPayload, 'akun done verifikasi', 200)
  //   } catch (error) {
  //     console.log(error)
  //     next(createError)
  //   }
  // },
  updateProfil: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const idUser = decoded.id
      console.log(idUser)
      const gambars = req.file.path
      // console.log(req.file)
      const ress = await cloudinary.uploader.upload(gambars)
      const data = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dateofbrith: req.body.dateofbrith,
        image: ress.url,
        address: req.body.address,
        password: req.body.password,
        phonenumber: req.body.phonenumber
      }
      console.log(data)
      modelUsers
        .updateProfil({ ...data.idUser })
        .then(() => {
          commonHellper.response(res, data, 'data updated success', 200)
        })
        .catch((error) => {
          console.log(error)
          next(createError)
        })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  verifyEmail: (req, res, next, email) => {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: '24h'
    })
    console.log(token)
  }
}

module.exports = {
  usersController
}
