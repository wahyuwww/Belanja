/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

const authModel = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
      const qs = 'SELECT email FROM users WHERE email = $1'
      db.query(qs, [body.email], (_err, data) => {
        if (data.length) {
          reject(new Error('account is ready'))
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              reject(err)
            }
            const { name, password, email, phone_number } = body
            console.log(name)
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
          // console.log(data)
          if (!data.rows[0].password.length) {
            reject(new Error('password wrong'))
          } else {
            bcrypt.compare(
              body.password,
              data.rows[0].password,
              (err, result) => {
                // console.log(!result)
                if (!result) {
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
                if (result) {
                  reject(new Error('data password failed'))
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
  }
}

module.exports = {
  authModel
}
