const express = require('express')
const Router = express.Router()
const { categoryController } = require('../controller/category')

Router.get('/', categoryController.getCategory)
  .get('/search', categoryController.getSearchCategory)
  .get('/sort', categoryController.getSortCategory)
  .post('/', categoryController.insert)
  .put('/:id', categoryController.update)
  .delete('/:id', categoryController.deleteCategory)

module.exports = Router
