const express = require('express')
const Router = express.Router()
const { controllerReview } = require('../controller/review')

Router.get('/', controllerReview.getReview)
  .get('/:id', controllerReview.getProductByReview)
  .get('/filter', controllerReview.getSortReview)
  .post('/', controllerReview.insert)
  .put('/:id', controllerReview.update)
  .delete('/:id', controllerReview.deleteReview)

module.exports = Router
