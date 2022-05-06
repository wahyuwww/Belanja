const express = require('express')
const Router = express.Router()
const uploadImg = require('../middleware/upload')
const productsContoller = require('../controller/product')

Router.get('/', productsContoller.productsContoller.getProducts)
  .get('/AllProduct', productsContoller.productsContoller.getAllProducts)
  .get('/filter', productsContoller.productsContoller.getProductByFilter)
  .get('/search', productsContoller.productsContoller.getSearchProducts)
  .get('/category', productsContoller.productsContoller.getProductsByCategori)
  .get('/:id', productsContoller.productsContoller.getProductById)
  .post('/', uploadImg.multipleUpload, productsContoller.productsContoller.insert)
  .put('/:id', uploadImg.multipleUpload, productsContoller.productsContoller.update)
  .delete('/:id', productsContoller.productsContoller.deleteProducts)

module.exports = Router
