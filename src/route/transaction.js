const express = require('express')
const Router = express.Router()
const { transactionContoller } = require('../controller/transactions')
// const validateStatus = require('../middleware/statusTransactions')

Router
  .get('/', transactionContoller.getTransaction)
  .get('/AllTransaction', transactionContoller.getAllTransactions)
  .get('/search', transactionContoller.getSearchTransactions)
  .post('/', transactionContoller.insert)
  .put('/:id', transactionContoller.update)
  .delete('/:id', transactionContoller.deleteTransaction)
  .get('/:id', transactionContoller.getTransactionsById)
  .get('/transactionDetail/:id', transactionContoller.getTransactionDetail)
  .patch('/address', transactionContoller.insertAddres)
module.exports = Router
