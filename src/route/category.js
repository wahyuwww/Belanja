const express = require('express')
const Router = express.Router()
const categoryContoller = require('../controller/category')

Router.get('/', categoryContoller.categoryContoller.getCategory)
  .get('/search', categoryContoller.categoryContoller.getSearchCategory)
  .get('/sort', categoryContoller.categoryContoller.getSortCategory)
  .post('/', categoryContoller.categoryContoller.insert)
  .put('/:id', categoryContoller.categoryContoller.update)
  .delete('/:id', categoryContoller.categoryContoller.deleteCategory)

module.exports = Router
