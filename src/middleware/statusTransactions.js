// const { json } = require('express')
const transactiontsModel = require('../model/transaction')
const validateStatus = (req, res, next) => {
  const id = req.params.id
  const result = transactiontsModel.modelTransaction.transactionsDetail(id)
  console.log(id)
  if (result === 'SUCCESS') {
    return res.json({
      result,
      mesagge: 'masih belum lunas'
    })
  }
  next()
}

module.exports = {
  validateStatus
}
