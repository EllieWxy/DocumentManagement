const Router = require('koa-router');
const { v1: uuid } = require('uuid')
const File = require('../modules/file');
const JSONError = require('../utils/JSONError');

const router = new Router({
  prefix: '/api/file'
});

/**
 post /file
 新增一个文件
 */


router.post('/',async function (ctx) {
  const {father,title,content,keyword} = ctx.request.body;
  const {cid} = ctx.session.club;
  const fid = uuid()
  if(father){
    await File.fatherAddChild(father,fid,title)
  }
  await File.addFile(fid,cid,title,content,father,keyword);
  ctx.response.body = {message : '文章创建成功'};
})

/**
 get /file
 获取所有文件
 */

router.get('/',async function (ctx) {
  const cid = ctx.session.club.cid;
  const result = await File.getFiles(cid)
  ctx.response.body = result
})

/**
 * get /file/<id>
 * 获取文章的详细信息
 * */

router.get('/:id',async function (ctx) {
  const fid = ctx.params.id;
  const cid = ctx.session.club.cid;
  const result = await File.getFileByID(cid,fid);
  ctx.response.body = result
})

router.get('/search/:search',async function (ctx) {
  const searchValue = ctx.params.search;
  const cid = ctx.session.club.cid;
  const result = await File.searchFile(cid,searchValue);
  ctx.response.body = result
})

/**
 * put /file/<id>
 *   更新一个文章的内容/标题
 * */

router.put('/:id',async function(ctx) {
  const fid = ctx.params.id;
  const {content=undefined,title=undefined,father=undefined} = ctx.request.body
  const {cid,clubName} = ctx.session.club;
  if(fid === clubName){
    throw JSONError('社团根目录不可修改',403)
  }
  if(father !== undefined){
    await File.fatherRemoveChild(cid,fid)
    await File.fileChangeFather(cid,fid,father)
    await File.fatherAddChild(father,fid,title)
  }
  const result = await File.updateFile(cid,fid,title,content)
  ctx.response.body = result
})

/**
 * delete /file/<id>
 *   删除一个文档记录
 * */

router.delete('/:id',async function (ctx) {
  const fid = ctx.params.id;
  const cid = ctx.session.club.cid;
  const result = await File.deleteFile(cid,fid)
  ctx.response.body = result
})


module.exports = router
