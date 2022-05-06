const db = require('../config/db')

const modelReview = {
  select: ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM review LIMIT $1 OFFSET $2',
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result.rows)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  getProductByReview: (id) => {
    return db.query(
      'SELECT * FROM review INNER JOIN products ON review.idproduct = products.id WHERE review.id = $1',
      [id]
    )
  },
  sortByReview: ({ sort, type, limit, offset }) => {
    return db.query(
      `SELECT * FROM review ORDER BY ${sort} ${type} LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
  },
  insert: ({ review, rating, idproduct }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO review (review,rating,idproduct) VALUES ($1,$2,$3)',
        [review, rating, idproduct],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  update: ({ review, rating, idproduct, id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE review SET review = $1, rating = $2 , idproduct = $3 WHERE id=$4',
        [review, rating, idproduct, id],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  deleteReview: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM review WHERE id = $1', [id], (err, result) => {
        if (!err) {
          // console.log(result.rows)
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = {
  modelReview
}
