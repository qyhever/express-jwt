const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const auth = require('@utils/auth')

/**
 * @api {post} /user/login 用户登录
 * @apiName userLogin
 * @apiGroup User
 *
 * @apiParam {String} userName 用户名
 * @apiParam {String} password 密码
 *
 * @apiVersion 0.0.0
 *
 * @apiUse Error
 * @apiUse Success
 */
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  if (!username) {
    return next(createError(400, 'param username is required'))
  }
  if (!password) {
    return next(createError(400, 'param password is required'))
  }
  res.json({
    success: true,
    data: auth.generateToken({
      username,
      password
    })
  })
})

/**
 * @api {get} /user/currentUser 获取当前用户信息
 * @apiName userCurrent
 * @apiGroup User
 *
 * @apiHeader {String} Authorization token
 *
 * @apiVersion 0.0.0
 *
 * @apiUse Error
 * @apiUse Success
 */
router.get('/currentUser', function(req, res, next) {
  res.json({
    success: true,
    data: req.app.decoded
  })
})

module.exports = router
