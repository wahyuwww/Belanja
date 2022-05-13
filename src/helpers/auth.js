const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verify = {
    expiresIn: '1h',
    issuer: 'belanja aja'
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, verify)
  return token
}
const generateRefreshToken = (payload) => {
  return new Promise((resolve, reject) => {
    const verify = {
      expiresIn: '1h',
      issuer: 'belanja aja'
    }
    jwt.sign(payload, process.env.SECRET_KEY, verify, (err, token) => {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })
}
const verifyRefresh = (email, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded.email === email
  } catch (error) {
    // console.error(error);
    return false
  }
}
module.exports = {
  generateToken,
  generateRefreshToken,
  verifyRefresh
}
