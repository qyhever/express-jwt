const createError = require('http-errors')
const auth = require('@/utils/auth')

module.exports = function (options) {
  const { unless = [] } = options
  return function (req, res, next) {
    // 不校验 token 的 url，直接 next
    for (let i = 0; i < unless.length; i++) {
      const item = unless[i]
      if (item.test(req.originalUrl)) {
        return next()
      }
    }
    // 如果用 req.headers.authorization 获取，需要小写
    const token = req.get('Authorization')
    if (!token) {
      return next(createError(401, '没有token，请先登录'))
    }
    try {
      const decoded = auth.verifyToken(token)
      // 挂载 decoded 到应用实例上，后面的路由可以使用
      req.app.decoded = decoded
      next()
    } catch (err) {
      console.log('err', err)
      next(createError(401, 'token无效'))
    }
  }
}