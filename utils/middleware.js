const JSONError = require('./JSONError')

exports.checkLogin = function (ctx,next) {
  if(!ctx.session.user){
    throw new JSONError('请先进行登录',403)
  }
  next()
}
