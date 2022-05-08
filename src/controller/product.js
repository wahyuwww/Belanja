const productsModel = require('../model/product')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')

const productsContoller = {
  getProducts: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      const result = await productsModel.modelProducts.select({
        offset, limit
      })
      const {
        rows: [count]
      } = await productsModel.modelProducts.countProducts()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHellper.response(res, result, 'get data success', 200, pagination)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const result = await productsModel.modelProducts.getAllProducts()
      commonHellper.response(res, result, 'get data success', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await productsModel.modelProducts.getProductById(id)
      commonHellper.response(res, result.rows, 'get data success', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getProductByFilter: async (req, res, next) => {
    try {
      const sort = req.query.sort
      const type = req.query.type
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      console.log(type)
      const result = await productsModel.modelProducts.filterProduct({
        sort,
        type,
        limit,
        offset
      })
      res.json({
        data: result.rows
      })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSearchProducts: (req, res, next) => {
    const search = req.query.search
    console.log(search)
    productsModel.modelProducts.searchProductsByCategori(search)
      .then((result) => {
        res.json({
          data: result.rows
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  getProductsByCategori: (req, res, next) => {
    const id = req.params.id
    productsModel.modelProducts.ProductByCategory(id)
      .then((result) => {
        commonHellper.response(res, result.rows, 'data product by categori', 200)
      })
      .catch((err) => {
        console.log(err)
        next(createError)
      })
  },
  insert: (req, res, next) => {
    const {
      name, description, stock, price, idcategory, image, iduser, color, size
    } =
      req.body
    const data = {
      name,
      description,
      stock,
      price,
      idcategory,
      image,
      iduser,
      color,
      size
    }
    productsModel.modelProducts
      .insert(data)
      .then(() => {
        commonHellper.response(res, data, 'data added successfully', 201)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  update: (req, res, next) => {
    const { name, description, stock, price, idcategory, image, color, size } =
      req.body
    const data = {
      name,
      description,
      stock,
      price,
      idcategory,
      image,
      color,
      size
    }
    console.log(data)
    const id = req.params.id
    productsModel.modelProducts
      .update({ ...data, id })
      .then(() => {
        commonHellper.response(res, data, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deleteProducts: (req, res, next) => {
    const id = req.params.id
    // const name = req.body.name
    productsModel.modelProducts
      .deleteProducts(id)
      .then((result) => {
        res.status(200).json({
          message: 'deleted success',
          data: `id : ${id}`
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  productsContoller
}
