/* eslint-disable camelcase */
const db = require('../config/db')

const modelUsers = {
  select: ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users LIMIT $1 OFFSET $2',
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
  // getProductById: (id) => {
  //   return db.query(
  //     'SELECT users.name,users.email AS email, galleries.photo AS photo, description, price, stock FROM products INNER JOIN category ON products.idCategory = category.id INNER JOIN galleries ON products.idGalleries = galleries.id WHERE products.id = $1',
  //     [id]
  //   )
  // },
  searchUsers: (search) => {
    return db.query('SELECT * FROM users WHERE name LIKE $1', [
      '%' + search + '%'
    ])
  },
  filterUsers: ({ sort, type, limit, offset }) => {
    return db.query(
      `SELECT name,email,phonen_number AS phone_number,gender FROM users ORDER BY ${sort} ${type} LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
  },
  insert: (body) => {
    const { name, password, email, role, store_name, store_description } = body
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users ( name, password, email, role, store_name, store_description) VALUES ($1,$2,$3,$4,$5,$6)',
        [name, password, email, role, store_name, store_description],
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
  update: ({
    name,
    password,
    email,
    phone_number,
    gender,
    date_of_brith,
    address,
    image,
    id
  }) => {
    // console.log(name)
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET name = $1,  password = $2, email = $3, phone_number = $4, gender = $5, date_of_brith = $6, address= $7,image = $8 WHERE id = $9',
        [
          name,
          password,
          email,
          phone_number,
          gender,
          date_of_brith,
          address,
          image,
          id
        ],
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
  updateProfil: (body) => {
    const { name, email, phonenumber, gender, image, date_of_brith, id } = body
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET name = $1, email = $2, phonenumber = $3, gender = $4, image = $5,  date_of_brith = $6 WHERE id=$7',
        [name, email, phonenumber, gender, image, date_of_brith, id],
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
  deleteUsers: (id) => {
    return db.query('DELETE FROM users WHERE id = $1', [id])
  },
  countUsers: () => {
    return db.query('SELECT COUNT(*) AS total FROM users')
  }
}

module.exports = {
  modelUsers
}
