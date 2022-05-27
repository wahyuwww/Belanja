const productsModel = require('../model/product')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')
// const client = require('../config/redis')

const productsController = {
  getProducts: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      const result = await productsModel.modelProducts.select({
        offset,
        limit
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
      if (result.length === 0) {
        res.json({
          msg: 'data not found'
        })
      }
      commonHellper.response(res, result, 'get data success', 200, pagination)
    } catch (error) {
      // console.log(error)
      next(createError)
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const result = await productsModel.modelProducts.getAllProducts()
      commonHellper.response(res, result, 'get data success', 200)
    } catch (error) {
      // console.log(error)
      next(createError)
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const id = req.params.id
      const {
        rows: [product]
      } = await productsModel.modelProducts.getProductById(id)
      // client.setEx(`products/${id}`, 60 * 60, JSON.stringify(product))
      // commonHellper.responnotdata(product)
      // console.log(product.length === null)
      // if (product === undefined) {
      //   res.json({
      //     msg: 'data not found'
      //   })
      // }
      commonHellper.response(
        res,
        product,
        'get data success dari database',
        200
      )
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
      const search = req.query.search
      console.log(search)
      console.log(type)
      const result = await productsModel.modelProducts.filterProduct({
        search,
        sort,
        type,
        limit,
        offset
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
      if (result.length === 0) {
        res.json({
          msg: 'data not found'
        })
      }
      commonHellper.response(
        res,
        result.rows,
        'get filter data success',
        200,
        pagination
      )
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSearchProducts: (req, res, next) => {
    const search = req.query.search
    // console.log(search)
    productsModel.modelProducts
      .searchProductsByCategori(search)
      .then((result) => {
        if (result.rows.length === 0) {
          res.json({
            msg: 'data not found'
          })
        }
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
    productsModel.modelProducts
      .ProductByCategory(id)
      .then((result) => {
        commonHellper.response(
          res,
          result.rows,
          'data product by categori',
          200
        )
      })
      .catch((err) => {
        console.log(err)
        next(createError)
      })
  },
  insert: async (req, res, next) => {
    try {
      const {
        name,
        description,
        stock,
        price,
        idcategory,
        iduser,
        color,
        size
      } = req.body
      const gambar = req.files.map((file) => {
        return `http://${req.get('host')}/img/${file.filename}`
      })
      // console.log(gambar2)
      const data = {
        name,
        description,
        stock,
        price,
        idcategory,
        image: [gambar],
        iduser,
        color,
        size
      }
      await productsModel.modelProducts.insert(data, req.body)
      commonHellper.response(res, data, 'data added successfully', 201)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  update: (req, res, next) => {
    const { name, description, stock, price, idcategory, color, size } =
      req.body
    const data = {
      name,
      description,
      stock,
      price,
      idcategory,
      image: `http://${req.get('host')}/img/${req.body.image}`,
      color,
      size
    }
    console.log(data)
    const id = req.params.id
    // client.setEx(`products/${id}`, 60 * 60, JSON.stringify(data))
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
  productsController
}
