const userModel = require('../models').User
const JSONError = require('../utils/JSONError')

/**
 * 检查当前系统中是否存在user
 */
exports.checkExistUser = async function() {
  const user = await userModel.findOne({ staffId: { $exists: true } })
  return Boolean(user)
}

exports.addUser = async function(user) {
  const { staffId, password, club } = user
  const res = await userModel.findOne({ staffId })
  if (res !== null) {
    throw new JSONError('账号已存在')
  }
  userModel.create({
    staffId,
    password,
    club
  })
}

exports.checkUser = function(staffId, password) {
  return userModel.findOne({ staffId }).then(res => {
    if (res === null) {
      throw new JSONError('账号不存在', 401)
    } else {
      if (res.password !== password) {
        throw new JSONError('用户名或密码不正确!', 401)
      }
    }
    return res
  })
}
