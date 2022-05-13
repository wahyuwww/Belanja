/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
            reject(new Error('data error'))
          }
        }
      )
    })
  },
  create: ({ id, name, password, email, role = 'users', phone_number }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (id, name, password, email,role,phonenumber) VALUES ($1,$2,$3,$4,$5,$6)',
        [id, name, password, email, role, phone_number],
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
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
      const qs = 'SELECT email FROM users WHERE email = $1'
      db.query(qs, [body.email], (_err, data) => {
        console.log()
        if (!data.rowCount.length) {
          reject(new Error('account is ready'))
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              reject(err)
            }
            const { name, password, email, phone_number } = body
            // console.log(name)
            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err)
              }
              db.query(
                'INSERT INTO users ( name, password, email, phone_number) VALUES ($1,$2,$3,$4)',
                [name, password, email, phone_number],
                (err, data) => {
                  if (!err) {
                    const payload = {
                      email,
                      password: hashedPassword
                    }
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                      expiresIn: '1h'
                    })
                    const id = data.insertId
                    resolve({ token, id })
                  } else {
                    reject(err)
                  }
                }
              )
            })
          })
        }
      })
    })
  },
  loginUser: (body) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE email = $1',
        [body.email],
        (err, data) => {
          if (err) {
            reject(err)
          }
          // console.log(data.rows[0].password.length)
          if (!data.rows[0].password.length) {
            reject(new Error('password wrong'))
          } else {
            bcrypt.compare(
              body.password,
              data.rows[0].password,
              (err, result) => {
                // console.log(!result)
                if (result) {
                  const { email } = body
                  const { password, id } = data.rows[0]
                  const payload = {
                    email,
                    password
                  }
                  const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                  })
                  resolve({
                    id,
                    email,
                    token
                  })
                }
                if (!result) {
                  reject(new Error('data password salah'))
                }
                if (err) {
                  reject(err)
                }
              }
            )
          }
        }
      )
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
  activasi: (id) => {
    return db.query('SELECT * FROM users WHERE id = $1', [
      id
    ])
  }
}

module.exports = {
  authModel
}
