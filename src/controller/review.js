const { modelReview } = require('../model/review')
const commonHellper = require('../helpers/common')
const createError = require('http-errors')

const controllerReview = {
  getReview: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1)
      // console.log(page)
      const limit = parseInt(req.query.limit || 5)
      const offset = (page - 1) * limit

      const result = await modelReview.select({
        limit,
        offset
      })

      const pagination = {
        currentPage: page,
        limit
      }

      commonHellper.response(res, result, 'get data success', 200, pagination)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  getSortReview: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const offset = (page - 1) * limit
      const type = req.query.type
      const sort = req.query.sort
      console.log(type)
      const result = await modelReview.sortByReview({
        sort,
        type,
        limit,
        offset
      })
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
    const { review, idproduct, rating } = req.body
    const data = {
      review,
      rating,
      idproduct
    }
    modelReview
      .insert(data)
      .then(() => {
        commonHellper.response(res, data, 'data added successfully', 201)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  getProductByReview: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await modelReview.getProductByReview(id)
      commonHellper.response(res, result.rows, 'get data success', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  update: (req, res, next) => {
    const { rating, review, idproduct } = req.body
    const id = req.params.id
    modelReview
      .update({ rating, review, idproduct, id })
      .then((result) => {
        commonHellper.response(
          res,
          result.rowCount,
          'data updated success',
          200
        )
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deleteReview: (req, res, next) => {
    const id = req.params.id
    // const name = req.body.name
    modelReview
      .deleteReview(id)
      .then((result) => {
        commonHellper.response(res, result, 'data deleted success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  controllerReview
}
