const Router = require('koa-router');
const File = require('../modules/file');
const config = require('../config');
const JSONError = require('../utils/JSONError');

const router = new Router({
  prefix: '/api/file'
});

/**
 post /file
 新增一个文件
 */


router.post('/',async function (ctx) {
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
 get /file
 获取所有文件
 */

router.get('/',async function (ctx) {
  const father = ctx.query.father || ctx.session.club;
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.getFiles(cid,father)
  ctx.response.body = result
})

/**
 * get /file/<id>
 * 获取文章的详细信息
 * */

router.get('/:id',async function (ctx) {
  const fid = ctx.params.id
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.getFileByID(cid,fid)
  ctx.response.body = result
})

/**
 * put /file/<id>
 *   更新一个文章的内容/标题
 * */

router.put('/:id',async function(ctx) {
  const fid = ctx.params.id;
  const content = ctx.request.body.content || undefined
  const title = ctx.request.body.title || undefined
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.updateFile(cid,fid,content)
  ctx.response.body = result
})

/**
 * delete /file/<id>
 *   删除一个文档记录
 * */

router.delete('/:id',async function (ctx) {
  const fid = ctx.params.id;
  // const cid = ctx.session.cid;
  const cid = 1;
  const result = await File.deleteFile(cid,fid)
  ctx.response.body = result
})

module.exports = router
