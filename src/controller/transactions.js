/* eslint-disable camelcase */
const transactiontsModel = require('../model/transaction')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')

const transactionController = {
  getTransaction: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1)
      // console.log(page)
      const limit = parseInt(req.query.limit || 5)
      const offset = (page - 1) * limit

      const result = await transactiontsModel.modelTransaction.select({
        limit,
        offset
      })
      const {
        rows: [count]
      } = await transactiontsModel.modelTransaction.countTransaction()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      // console.log(totalPage)
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
  getAllTransactions: (req, res, next) => {
    transactiontsModel.modelTransaction.getAllTransaction()
      .then((result) => {
        commonHellper.response(res, result, 'get data success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  getTransactionsById: async (req, res, next) => {
    try {
      const id = req.params.id
      // console.log(id)
      console.log(id)
      const result =
        await transactiontsModel.modelTransaction.getTransactionsById(id)
      commonHellper.response(res, result.rows, 'get data success', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSearchTransactions: (req, res, next) => {
    const search = req.query.search
    console.log(search)
    transactiontsModel.modelTransaction.searchTransactions(search)
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
  insert: (req, res, next) => {
    transactiontsModel.modelTransaction
      .insert(req.body)
      .then(() => {
        const responData = {
          ...req.body
        }
        commonHellper.response(res, responData, 'data added successfully', 201)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  update: (req, res, next) => {
    const id = req.params.id
    transactiontsModel.modelTransaction
      .update({ ...req.body, id })
      .then(() => {
        const responData = {
          ...req.body
        }
        commonHellper.response(res, responData, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deleteTransaction: (req, res, next) => {
    const id = req.params.id
    // const name = req.body.name
    transactiontsModel.modelTransaction
      .deleteTransactions(id)
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
  getTransactionDetail: async (req, res, next) => {
    try {
      const id = req.params.id
      const result =
      await transactiontsModel.modelTransaction.transactionsDetail(id)
      console.log(result)
      commonHellper.response(res, result.rows, 'get data success', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  insertAddres: (req, res, next) => {
    transactiontsModel.modelTransaction
      .addAddress(req.body)
      .then(() => {
        const responData = {
          ...req.body
        }
        commonHellper.response(res, responData, 'data added successfully', 201)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  transactionController
}
