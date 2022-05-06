const db = require('../config/db')

const modelCategories = {
  select: ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM category  LIMIT $1 OFFSET $2',
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
  searchCategory: (search) => {
    return db.query('SELECT * FROM category WHERE name LIKE $1', [
      '%' + search + '%'
    ])
  },
  sortByCategori: ({ type, limit, offset }) => {
    return db.query(
      `SELECT * FROM category ORDER BY name ${type} LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
  },
  insert: ({ name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO category (name) VALUES ($1)',
        [name],
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
  update: ({ name, id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE category SET name = $1 WHERE id=$2',
        [name, id],
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
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM category WHERE id = $1', [id], (err, result) => {
        if (!err) {
          // console.log(result.rows)
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  countCategory: () => {
    return db.query('SELECT COUNT(*) AS total FROM category')
  }
}

module.exports = {
  modelCategories
}
