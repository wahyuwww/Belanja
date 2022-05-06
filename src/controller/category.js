const categoryModel = require('../model/categories')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')

const categoryContoller = {
  getCategory: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1)
      // console.log(page)
      const limit = parseInt(req.query.limit || 5)
      const offset = (page - 1) * limit

      const result = await categoryModel.modelCategories.select({
        limit,
        offset
      })
      const {
        rows: [count]
      } = await categoryModel.modelCategories.countCategory()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      // console.log(totalPage)
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
  getSearchCategory: async (req, res, next) => {
    const search = req.query.search
    console.log(search)
    try {
      console.log(search)
      const result = await categoryModel.modelCategories.searchCategory(search)
      res.json({
        data: result.rows
      })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSortCategory: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      const type = req.query.type
      console.log(type)
      const result = await categoryModel.modelCategories.sortByCategori({ type, limit, offset })
      console.log(result)
      res.json({
        data: result.rows
      })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  insert: (req, res, next) => {
    const { name } = req.body
    const data = {
      name
    }
    categoryModel.modelCategories
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
    const name = req.body.name
    const id = req.params.id
    categoryModel.modelCategories
      .update({ name, id })
      .then(() => {
        commonHellper.response(res, name, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deleteCategory: (req, res, next) => {
    const id = req.params.id
    // const name = req.body.name
    categoryModel.modelCategories
      .deleteCategory(id)
      .then((result) => {
        commonHellper.response(res, result.id, 'data deleted success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })

    // const id = req.params.id

    // categoryModel.modelCategories
    //   .deleteCategory(id)
    //   .then(() => {
    //     console.log(res)
    //     res.status(200).json({
    //       message: 'data berhasil dihapus',
    //       id
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     res.status(500).json({
    //       message: 'interval error'
    //     })
    //   })
  }
}

module.exports = {
  categoryContoller
}
