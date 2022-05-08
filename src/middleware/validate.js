const validate = (req, res, next) => {
  const stock = req.body.stock

  if (stock < 1) {
    return res.json({
      mesagge: 'stock tidak boleh kurang 1'
    })
  }
  next()
}

module.exports = {
  validate
}
