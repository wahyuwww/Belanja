const express = require('express')
const Router = express.Router()
const uploadImg = require('../middleware/upload')
const { productsController } = require('../controller/product')
const validate = require('../middleware/validate')
const { protect, isAdmin } = require('../middleware/auth')
// const {
//   hitCacheDetailProduct,
//   ClearCahceProducts
// } = require('../middleware/redis')

Router.get('/', protect, productsController.getProducts)
  .get('/AllProduct', protect, productsController.getAllProducts)
  .get('/filter', productsController.getProductByFilter)
  // .get('/search', productsContoller.productsContoller.getSearchProducts)
  .get('/category/:id', productsController.getProductsByCategori)
  .get('/:id', protect, productsController.getProductById)
  .post(
    '/',
    protect,
    isAdmin,
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
  .delete('/:id', protect, isAdmin, productsController.deleteProducts)

module.exports = Router
