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
    club:ctx.session.club,
  }
})

module.exports = router
