/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const db = require('../config/db')

const authModel = {
  FindEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE email = $1',
        [email],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  create: ({ id, name, password, email, role = 'user', active = 0 }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (id, name, password, email,role,active) VALUES ($1,$2,$3,$4,$5,$6)',
        [id, name, password, email, role, active],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error('data error disini'))
          }
        }
      )
    })
  },
  activasi: ({ active = '1', email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET active = $1 where email = $2',
        [active, email],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error('data error disini'))
          }
        }
      )
    })
  },
  changePassword: (body) => {
    return new Promise((resolve, reject) => {
      const qs = 'SELECT email FROM users WHERE id = $1'
      db.query(qs, [body.id], (_err, data) => {
        if (!data.rows[0]) {
          bcrypt.genSalt(10, (_err, salt) => {
            if (_err) {
              reject(_err)
            }
            const { password, email } = body

            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err)
              }
              const queryString =
                'UPDATE users SET password= $1 WHERE email = $2'
              db.query(queryString, [hashedPassword, email], (err, data) => {
                if (!err) {
                  resolve({ msg: 'change password success' })
                } else {
                  reject(err)
                }
              })
            })
          })
        } else {
          reject(_err)
        }
      })
    })
  },
  sendEmail: (body) => {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT id, email FROM users WHERE email = $1'
      db.query(queryString, [body.email], (err, data) => {
        if (err) {
          reject(err)
        }
        console.log(data.rows[0].id)
        if (data.rows.length) {
          const link = `http://localhost:4000/v1/auth/activasi/${data.rows[0].id}`
          resolve({ email: data.rows[0].email, link })
        } else {
          reject(err)
        }
      })
    })
  },
  getProfil: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE id = $1',
        [id],
        (err, result) => {
          if (!err) {
            resolve(result.rows)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
  // cekActivasi: ({ active = '1', email }) => {
  //   return db.query('UPDATE users SET active = $1 where email = $2', [active, email])
  // }
}

module.exports = {
  authModel
}
