/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const { modelUsers } = require('../model/users')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')
// const jwt = require('jsonwebtoken')

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
  update: (req, res, next) => {
    const {
      name,
      password,
      email,
      phone_number,
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
      phone_number,
      gender,
      date_of_brith,
      address,
      role,
      image
    }
    console.log(2)
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
  updateProfil: (req, res, next) => {
    const { name, email, phonennumber, gender, dateofbrith, image } = req.body
    const data = {
      name,
      email,
      phonennumber,
      gender,
      dateofbrith,
      image
    }
    const id = req.params.id
    console.log(id)
    modelUsers
      .update({ ...data, id })
      .then(() => {
        console.log(data)
        commonHellper.response(res, data, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
  // register: async (req, res, next) => {
  //   const {
  //     email,
  //     password,
  //     name,
  //     phonennumber,
  //     gender,
  //     dateofbrith,
  //     address,
  //     avatar
  //   } = req.body

  //   const data = {
  //     email,
  //     password,
  //     name,
  //     phonennumber,
  //     gender,
  //     dateofbrith,
  //     address,
  //     avatar,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }

  //   bcrypt.genSalt(10, function (_err, salt) {
  //     bcrypt.hash(data.password, salt, function (_err, hash) {
  //       data.password = hash
  //       console.log(data)
  //       modelUsers
  //         .insert({ ...data })
  //         .then(() => {
  //           commonHellper.response(res, data, 'data added successfully', 201)
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           next(createError)
  //         })
  //     })
  //   })
  // },
  // login: (req, res, next) => {
  //   const { email, password } = req.body
  //   modelUsers
  //     .getUserbyEmail(email)
  //     .then((result) => {
  //       if (result.rows[0].email.length < 1) {
  //         return commonHellper.response(res, 'email failed', 200)
  //       }
  //       const user = result.rows[0]
  //       const hash = user.password

  //       bcrypt.compare(password, hash).then((resCompare) => {
  //         console.log(hash)
  //         if (!resCompare) {
  //           return res.status(201).json({
  //             msg: 'password failed'
  //           })
  //         }
  //         const payload = {
  //           id: user.id,
  //           email: user.email
  //         }
  //         jwt.sign(
  //           payload,
  //           process.env.SECRET_KEY,
  //           { expiresIn: 60 * 60 },
  //           (_err, token) => {
  //             user.token = token
  //             delete user.password
  //             res.json({})
  //           }
  //         )
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       next(createError)
  //     })
  // }
}

module.exports = {
  usersController
}
