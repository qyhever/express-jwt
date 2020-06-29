module.exports = function (options) {
  // console.log('cors options', options)
  return function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    // res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    })
    if (req.method === 'OPTIONS') {
      req.status(200).end()
    } else {
      next()
    }
  }
}
