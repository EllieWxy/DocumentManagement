const Router = require('koa-router');
const crypto = require('crypto');
const User = require('../modules/user');
const config = require('../config')
const JSONError = require('../utils/JSONError')


const router = new Router({
  prefix: '/api/common'
});

router.post('/login',async function(ctx) {
  let {user,password} = ctx.request.body;
  password = crypto.createHmac('sha256',config.salt).update(String(password)).digest('hex')
  const result = await User.checkUser(user,password);
  if(!result){
    throw new JSONError('登录失败',403)
    return
  }
  ctx.session["user"] = user;
  ctx.session["club"] = "redhome";
  ctx.session["cid"] = 1;
  ctx.response.body = '登录成功'
});

router.post('/reg',async function(ctx) {
  let {user,password} = ctx.request.body;
  password = crypto.createHmac('sha256',config.salt).update(password).digest('hex')
  await User.addUser(1,user,password)
  ctx.response.body = '注册成功！'
});

module.exports = router
