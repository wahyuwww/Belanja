const express = require('express')
const Router = express.Router()
const { transactionController } = require('../controller/transactions')
// const validateStatus = require('../middleware/statusTransactions')

Router
  .get('/', transactionController.getTransaction)
  .get('/AllTransaction', transactionController.getAllTransactions)
  .get('/search', transactionController.getSearchTransactions)
  .post('/', transactionController.insert)
  .put('/:id', transactionController.update)
  .delete('/:id', transactionController.deleteTransaction)
  .get('/:id', transactionController.getTransactionsById)
  .get('/transactionDetail/:id', transactionController.getTransactionDetail)
  .patch('/address', transactionController.insertAddres)
module.exports = Router
