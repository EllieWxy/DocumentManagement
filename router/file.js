const Router = require('koa-router');
const File = require('../modules/file');
const config = require('../config')

const router = new Router({
  prefix: '/api/file'
});

router.post('/addFile',async function (ctx) {
  const {fid,title,content,key} = ctx.request.body;
  // const {cid} = ctx.session;
  const cid = 1;
  await File.addFile(cid,title,content,fid,key)
})

router.get('/getFiles',async function (ctx) {
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.getFiles(cid)
  ctx.response.body = result
})

module.exports = router
