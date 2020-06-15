const JSONError = require('./JSONError')

exports.checkLogin = async function (ctx,next) {
  if(!ctx.session.user){
    throw new JSONError('未登录',401)
  }
  await next()
}
