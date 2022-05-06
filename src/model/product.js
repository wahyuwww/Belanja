const db = require('../config/db')

const modelProducts = {
  select: ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM products LIMIT $1 OFFSET $2',
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
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products ', (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductById: (id) => {
    return db.query(
      'SELECT products.name,category.name AS name_categori, users.storename AS name_store, description, price, stock FROM products INNER JOIN category ON products.idCategory = category.id INNER JOIN users ON products.iduser = users.id WHERE products.id = $1',
      [id]
    )
  },
  ProductByCategory: () => {
    return db.query(' SELECT products.name,category.name AS name_categori, users.storename AS name_store, description, price, stock FROM products INNER JOIN category ON products.idCategory = category.id INNER JOIN users ON products.iduser =users.id')
  },
  // searchProductsByCategori: (search) => {
  //   return db.query('SELECT * FROM products WHERE idcategori LIKE $1', [
  //     '%' + search + '%'
  //   ])
  // },
  filterProduct: ({ sort, type, limit, offset }) => {
    return db.query(
      `SELECT name,description,price FROM products ORDER BY ${sort} ${type} LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
  },
  insert: ({
    name,
    description,
    stock,
    price,
    idcategory,
    image,
    iduser,
    size,
    color
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO products (name,description,stock,price,idCategory,image,iduser,size,color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [
          name,
          description,
          stock,
          price,
          idcategory,
          image,
          iduser,
          size,
          color
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
  update: ({
    name,
    description,
    stock,
    price,
    idcategory,
    image,
    size,
    color,
    id
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE products SET name = $1,  description = $2, stock = $3, price = $4, idcategory = $5, image = $6 ,size=$7,color=$8 WHERE id=$9',
        [name, description, stock, price, idcategory, image, size, color, id],
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
  deleteProducts: (id) => {
    return db.query('DELETE FROM products WHERE id = $1', [id])
  },
  countProducts: () => {
    return db.query('SELECT COUNT(*) AS total FROM products')
  }
}

module.exports = {
  modelProducts
}
