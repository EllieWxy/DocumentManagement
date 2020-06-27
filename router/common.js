const Router = require('koa-router')
const crypto = require('crypto')
const mongoose = require('mongoose')
const packageJson = require('../package')
const User = require('../modules/user')
const Club = require('../modules/club')
const config = require('../config')
const JSONError = require('../utils/JSONError')
const File = require('../modules/file')

const router = new Router({
  prefix: '/api/common'
})

/**
 * 获取当前的平台信息
 */
router.get('/platformInfo', async function(ctx) {
  const hasClub = await Club.checkExistClub()
  const hasUser = await User.checkExistUser()
  ctx.body = {
    version: packageJson.version,
    needInitClub: !hasClub,
    needInitUser: !hasUser
  }
})

/**
 * 初始化平台
 */
router.post('/initial', async function(ctx) {
  const hasClub = await Club.checkExistClub()
  const hasUser = await User.checkExistUser()
  if (hasClub && hasUser) {
    throw new JSONError('', 404)
  }

  const { user, club } = ctx.request.body
  // 类型校验
  try {
    if (!user.staffId || !user.password || !club.clubName) {
      throw new Error()
    }
  } catch (e) {
    throw new JSONError('参数信息不可为空', 403)
  }

  // 创建club & 创建user
  // TODO 考虑添加事物
  // const session = await mongoose.startSession()
  // await session.startTransaction()
  try {
    const createdClub = await Club.addClub(club)
    await User.addUser({ ...user, club: createdClub.cid })
    // await session.commitTransaction()
  } catch (e) {
    console.log(e.message)
    // await session.abortTransaction()
    throw new JSONError('服务器错误', 500)
  }
  // await session.endSession()

  ctx.response.body = { message: '初始化成功' }
})

router.post('/login', async function(ctx) {
  let { staffId, password } = ctx.request.body
  password = crypto
    .createHmac('sha256', config.salt)
    .update(String(password))
    .digest('hex')
  const result = await User.checkUser(staffId, password)
  if (!result) {
    throw new JSONError('登录失败', 403)
  }
  const cid = result.cid ? result.cid[0] : ''
  const clubInfo = await Club.getClubInfo(cid)
  if (!clubInfo) {
    throw new JSONError('未注册社团或社团不存在', 403)
  }
  ctx.session['user'] = user
  ctx.session['club'] = clubInfo.clubName
  ctx.session['cid'] = cid
  ctx.response.body = { message: '登录成功！' }
})

router.post('/reg', async function(ctx) {
  let { club, staffId, password } = ctx.request.body
  password = crypto
    .createHmac('sha256', config.salt)
    .update(password)
    .digest('hex')
  await User.addUser({ club, staffId, password })
  ctx.response.body = { message: '注册成功！' }
})

router.post('/clubReg', async function(ctx) {
  let { clubName } = ctx.request.body
  const clubRes = await Club.getClubInfoByName(clubName)
  if (clubRes.length !== 0) {
    throw new JSONError('社团名称已存在', 403)
  }
  const clubNumber = await File.getNextSequenceValue('club')
  const clubID = clubNumber.clubID
  const res = await Club.addClub(clubID, clubName)
  ctx.response.body = res
})

module.exports = router
