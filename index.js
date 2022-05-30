require('dotenv').config()
// peckage
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const CreateError = require('http-errors')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const path = require('path')
// routing
const Router = require('./src/route/index')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// app.use(helmet())
helmet({
  crossOriginResourcePolicy: false
})
app.use(xss())
app.disable('x-powered-by')

app.use('/v1', Router)
app.use('/img', express.static(path.join(__dirname, './public/images')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`example app listening at http://localhost:${PORT}`)
})
app.all('*', (req, res, next) => {
  next(new CreateError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})
