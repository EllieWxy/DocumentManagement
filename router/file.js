const Router = require('koa-router');
const File = require('../modules/file');
const config = require('../config');
const JSONError = require('../utils/JSONError');

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
  const cid = 1;
  const fidDocs = await File.getNextSequenceValue("file");
  if(!fidDocs){
    throw new JSONError('社团未注册！');
    return
  }
  const fid = fidDocs.id;
  const result = await File.fatherAddChild(father,fid,title);
  if(!result){
    throw new JSONError('父文件不存在')
    return
  }
  await File.addFile(fid,cid,title,content,father,key);
  ctx.response.body = '文章创建成功';
})

/**
 get getFiles
 获取所有文件
 */

router.get('/getFiles',async function (ctx) {
  // const cid = ctx.session.cid;
  const father = ctx.query.father || ctx.session.club;
  const cid = 1;
  const result = await File.getAllFiles(cid,father)
  ctx.response.body = result
})



module.exports = router
