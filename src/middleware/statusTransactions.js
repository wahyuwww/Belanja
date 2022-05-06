// const { json } = require('express')
const transactiontsModel = require('../model/transaction')
const validateStatus = (req, res, next) => {
  const id = req.params.id
  const result = transactiontsModel.modelTransaction.transactionsDetail(id)
  console.log(id)
  if (result === 'SUCCESS') {
    return res.json({
      result,
      mesagge: 'stock tidak boleh kurang 1'
    })
  }
  next()
}

module.exports = {
  validateStatus
}
