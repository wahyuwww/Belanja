const express = require('express')
const Router = express.Router()
const { transactionController } = require('../controller/transactions')
// const validateStatus = require('../middleware/statusTransactions')
const { isAdmin, protect, isUsers } = require('../middleware/auth')
const activasi = require('../middleware/activasi')

Router.get('/', transactionController.getTransaction)
  .get(
    '/AllTransaction',
    protect,
    isAdmin,
    transactionController.getAllTransactions
  )
  .get('/search', transactionController.getSearchTransactions)
  .get(
    '/transactionDetail/:id',
    protect, activasi,
    isUsers,
    transactionController.getTransactionDetail
  )
  .post('/', transactionController.insert)
  .put('/:id', protect, isAdmin, transactionController.update)
  .delete('/:id', transactionController.deleteTransaction)
  .get('/:id', transactionController.getTransactionsById)
  .patch('/address', isAdmin, protect, transactionController.insertAddres)
module.exports = Router
