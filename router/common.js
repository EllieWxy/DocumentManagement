const Router = require('koa-router');
const crypto = require('crypto');
const User = require('../modules/user');
const Club = require('../modules/club')
const config = require('../config')
const JSONError = require('../utils/JSONError')
const File = require('../modules/file')


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
  const cid = result.cid ? result.cid[0] : ''
  const clubInfo = await Club.getClubInfo(cid)
  if(!clubInfo){
    throw new JSONError('未注册社团或社团不存在',403)
    return
  }
  ctx.session["user"] = user;
  ctx.session["club"] = clubInfo.clubName;
  ctx.session["cid"] = cid;
  ctx.response.body = {message : '登录成功！'}
});

router.post('/reg',async function(ctx) {
  let {cid,user,password} = ctx.request.body;
  password = crypto.createHmac('sha256',config.salt).update(password).digest('hex')
  await User.addUser(cid,user,password)
  ctx.response.body = {message : '注册成功！'}
});

router.post('/clubReg',async function(ctx) {
  let {clubName} = ctx.request.body;
  const clubRes = await Club.getClubInfoByName(clubName)
  if(clubRes.length !== 0){
    throw new JSONError('社团名称已存在',403)
    return;
  }
  const clubNumber = await File.getNextSequenceValue('club')
  const clubID = clubNumber.clubID
  const res = await Club.addClub(clubID,clubName);
  ctx.response.body = res
})

module.exports = router
