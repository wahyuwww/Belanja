const express = require('express')
const Router = express.Router()
const uploadImg = require('../middleware/upload')
const { productsController } = require('../controller/product')
const validate = require('../middleware/validate')
const { protect, isAdmin, isUsers } = require('../middleware/auth')
// const {
//   hitCacheDetailProduct,
//   ClearCahceProducts
// } = require('../middleware/redis')

Router.get('/', productsController.getProducts)
  .get('/AllProduct', productsController.getAllProducts)
  .get('/filter', productsController.getProductByFilter)
  // .get('/search', productsContoller.productsContoller.getSearchProducts)
  .get(
    '/category/:id',
    protect,
    isUsers, productsController.getProductsByCategori
  )
  .get(
    '/:id',
    protect,
    productsController.getProductById
  )
  .post(
    '/',
    validate.validate,
    uploadImg.multipleUpload,
    productsController.insert
  )
  .put(
    '/:id',
    protect,
    isAdmin,
    uploadImg.multipleUpload,
    productsController.update
  )
  .delete(
    '/:id',
    productsController.deleteProducts
  )

module.exports = Router
