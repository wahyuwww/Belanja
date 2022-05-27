// const client = require('../config/redis')
// const commonHellper = require('../helpers/common')
// // const productsModel = require('../model/product')

// const hitCacheDetailProduct = async (req, res, next) => {
//   const id = req.params.id
//   //   const {
//   //     rows: [products]
//   //   } = await productsModel.modelProducts.getProductById(id)
//   const product = await client.get(`products/${id}`)
//   console.log(product)
//   if (product) {
//     return commonHellper.response(res, JSON.parse(product), 'get data dari redis', 200)
//   }
//   next()
// }

// const ClearCahceProducts = async (req, res, next) => {
//   const id = req.params.id
//   client.del(`products/${id}`)
//   next()
// }

// module.exports = {
//   hitCacheDetailProduct,
//   ClearCahceProducts
// }
