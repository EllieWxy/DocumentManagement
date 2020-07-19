const Router = require('koa-router')
// const mongoose = require('mongoose')
const packageJson = require('../package')
const User = require('../modules/user')
const Club = require('../modules/club')
const File = require('../modules/file')
const JSONError = require('../utils/JSONError')
const calcPassword = require('../utils/calcPassword')

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
    const {clubName }= club
    await File.addFile(clubName,createdClub.cid,clubName)
    await User.addUser({
      staffId: user.staffId,
      password: calcPassword(user.password),
      club: createdClub.cid
    })
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
  const result = await User.checkUser(staffId, calcPassword(password))
  if (!result) {
    throw new JSONError('登录失败', 403)
  }
  const cid = result.club
  const clubInfo = await Club.getClubInfo(cid)
  if (!clubInfo) {
    throw new JSONError('未注册社团或社团不存在', 403)
  }
  ctx.session['user'] = result
  ctx.session['club'] = clubInfo
  ctx.response.body = { message: '登录成功！' }
})

router.post('/reg', async function(ctx) {
  let { club, staffId, password } = ctx.request.body
  await User.addUser({ club, staffId, password: calcPassword(password) })
  ctx.response.body = { message: '注册成功！' }
})

router.post('/clubReg', async function(ctx) {
  let { clubName } = ctx.request.body
  const res = await Club.addClub(clubName)
  await File.addFile(clubName,res.cid,clubName)
  ctx.response.body = res
})

module.exports = router
