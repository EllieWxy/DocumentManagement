const Router = require('koa-router');
const File = require('../modules/file');
const config = require('../config');
const JSONError = require('utils/JSONError');

const router = new Router({
  prefix: '/api/file'
});

/**
 post addFile
 新增一个文件
 */


router.post('/addFile',async function (ctx) {
  const {father,title,content,key} = ctx.request.body;
  // const {cid} = ctx.session;
  const fidDocs = await File.getNextSequenceValue("file");
  if(!fidDocs){
    throw new JSONError('社团未注册！');
    return
  }
  const cid = 1;
  await File.addFile(fidDocs.id,cid,title,content,father,key)
})

/**
 get getFiles
 获取所有文件
 */

router.get('/getFiles',async function (ctx) {
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.getFiles(cid)
  ctx.response.body = result
})



module.exports = router
