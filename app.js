require('module-alias/register') // alias
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('@/middlewares/cors')
const authorization = require('@/middlewares/authorization')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// cors
app.use(cors())
// authorization
app.use(authorization({
  unless: [
    /^\/user\/login/
  ]
}))

// routes
app.use('/user', require('./routes/user'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500

  res.status(status).json({
    success: false,
    code: status,
    msg: err.message
  })
})

module.exports = app
