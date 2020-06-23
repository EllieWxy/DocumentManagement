const Router = require('koa-router');

const router = new Router({
  prefix: '/api/user'
})

/**
 * 获取当前的用户信息
 */

router.get('/userInfo', function(ctx) {
  ctx.body = {
    user:ctx.session.user,
    cid:ctx.session.cid,
    clubName:ctx.session.clubName
  }
})

module.exports = router
