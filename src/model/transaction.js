/* eslint-disable camelcase */
const db = require('../config/db')

const modelTransaction = {
  select: ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM transactions LIMIT $1 OFFSET $2',
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
  getAllTransaction: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM transactions', (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getTransactionsById: (id) => {
    return db.query(
      'SELECT transactions.transaction_status, transactions.shipping_price, transactions.total_price, users.name as name_user, transactions.quantity, transactions.payment, products.name AS products_name, products.size FROM transactions INNER JOIN products ON transactions.id = products.id INNER JOIN users ON products.iduser = users.id where transactions.id = $1',
      [id]
    )
  },
  searchTransactions: (search) => {
    return db.query(
      'SELECT * FROM transactions WHERE transaction_status LIKE $1',
      ['%' + search + '%']
    )
  },
  insert: (body) => {
    const {
      transaction_status,
      shipping_price,
      total_price,
      id_user,
      id_product,
      quantity,
      payment
    } = body
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO transactions (transaction_status,shipping_price,total_price,id_user,id_product, quantity,payment) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [
          transaction_status,
          shipping_price,
          total_price,
          id_user,
          id_product,
          quantity,
          payment
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
  update: (body) => {
    const {
      transaction_status,
      shipping_price,
      total_price,
      id_user,
      id_product,
      quantity,
      payment,
      id
    } = body
    // console.log(id_product);
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE transactions SET transaction_status = $1,  shipping_price = $2, total_price = $3, id_user = $4, id_product = $5, quantity = $6,payment = $7 WHERE id=$8',
        [
          transaction_status,
          shipping_price,
          total_price,
          id_user,
          id_product,
          quantity,
          payment,
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
  deleteTransactions: (id) => {
    return db.query('DELETE FROM transactions WHERE id = $1', [id])
  },
  countTransaction: () => {
    return db.query('SELECT COUNT(*) AS total FROM transactions')
  },
  addAddress: (body) => {
    const {
      receipt_name,
      telephone_number,
      address,
      postal_code,
      city_or_subdistric,
      user_id
    } = body
    return new Promise((resolve, reject) => {
      // resolve(body)
      const qs =
        'UPDATE address SET receipt_name=$1, telephone_number=$2, address=$3, postal_code=$4, city_or_subdistric=$5 WHERE user_id=$6'
      db.query(
        qs,
        [receipt_name,
          telephone_number,
          address,
          postal_code,
          city_or_subdistric,
          user_id
        ],
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
            console.log(data)
          }
        }
      )
    })
  },
  transactionsDetail: (id) => {
    return db.query(
      'SELECT users.name as name_user, users.address as address_user , products.name,transactions.transaction_status AS status , transactions.total_price, transactions.shipping_price, transactions.payment, transactions.quantity FROM transactions INNER JOIN products ON transactions.id = products.id INNER JOIN users ON transactions.id_user = users.id where transactions.id = $1',
      [id]
    )
  }
}

module.exports = {
  modelTransaction
}
