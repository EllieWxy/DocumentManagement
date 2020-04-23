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
 get getAllFiles
 获取所有文件
 */

router.get('/getAllFiles',async function (ctx) {
  // const cid = ctx.session.cid;
  const father = ctx.query.father || ctx.session.club;
  const cid = ctx.session.cid;
  const result = await File.getAllFiles(cid,father)
  ctx.response.body = result
})

/**
 * get getFileDetail
 * 获取文章的详细信息
 * */

router.get('/getFileDetail',async function (ctx) {
  const fid = ctx.query.fid;
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.getFileDetail(cid,fid)
  ctx.response.body = result
})

router.post('/saveFile',async function(ctx) {
  const {fid,content} = ctx.request.body
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.saveFile(cid,fid,content)
  ctx.response.body = result
})

module.exports = router
