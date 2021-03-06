const express = require('express')
const Router = express.Router()
const uploadImg = require('../middleware/upload')
const { productsController } = require('../controller/product')
const validate = require('../middleware/validate')
// const { protect, isAdmin } = require('../middleware/auth')
// const {
//   hitCacheDetailProduct,
//   ClearCahceProducts
// } = require('../middleware/redis')

Router.get('/', productsController.getProducts)
  .get('/AllProduct', productsController.getAllProducts)
  .get('/filter', productsController.getProductByFilter)
  // .get('/search', productsContoller.productsContoller.getSearchProducts)
  .get('/category/:id', productsController.getProductsByCategori)
  .get('/:id', productsController.getProductById)
  .post(
    '/',
    validate.validate,
    uploadImg.singleUpload,
    productsController.insert
  )
  .put('/:id', uploadImg.singleUpload, productsController.update)
  .delete('/:id', productsController.deleteProducts)

module.exports = Router
