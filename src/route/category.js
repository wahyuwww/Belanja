const express = require('express')
const Router = express.Router()
const { categoryController } = require('../controller/category')
const { isAdmin, protect } = require('../middleware/auth')

Router.get('/', categoryController.getCategory)
  .get('/search', categoryController.getSearchCategory)
  .get('/sort', categoryController.getSortCategory)
  .post('/', protect, isAdmin, categoryController.insert)
  .put('/:id', protect, isAdmin, categoryController.update)
  .delete('/:id', protect, isAdmin, categoryController.deleteCategory)

module.exports = Router
