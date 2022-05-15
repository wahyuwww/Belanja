const jwt = require('jsonwebtoken')

const activasi = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  await jwt.sign(token, process.env.SECRET_KEY)
  const deco = req.decoded
  if (deco.status === '0') {
    return res.json({
      mesagge: 'silahkan activasi terlebih dahulu ya'
    })
  }
  next()
}

module.exports = activasi
