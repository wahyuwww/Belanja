const express = require('express')
const Router = express.Router()
const { transactionController } = require('../controller/transactions')
// const validateStatus = require('../middleware/statusTransactions')
const { isAdmin, protect } = require('../middleware/auth')

Router.get('/', transactionController.getTransaction)
  .get(
    '/AllTransaction',
    protect,
    isAdmin,
    transactionController.getAllTransactions
  )
  .get('/search', transactionController.getSearchTransactions)
  .post('/', transactionController.insert)
  .put('/:id', protect, isAdmin, transactionController.update)
  .delete('/:id', transactionController.deleteTransaction)
  .get('/:id', transactionController.getTransactionsById)
  .get('/transactionDetail/:id', transactionController.getTransactionDetail)
  .patch('/address', isAdmin, protect, transactionController.insertAddres)
module.exports = Router
