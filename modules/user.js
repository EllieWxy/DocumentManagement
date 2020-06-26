const { v1: uuid } = require('uuid')
const userModel = require('../models').User
const JSONError = require('../utils/JSONError')

/**
 * 检查当前系统中是否存在user
 */
exports.checkExistUser = async function() {
  const user = await userModel.findOne({ uid: { $exists: true } })
  return Boolean(user)
}

exports.addUser = async function(user) {
  const { username, password, clubs = [] } = user
  const res = await userModel.findOne({ username })
  if (res !== null) {
    throw new JSONError('账号已存在')
  }
  userModel.create({
    uid: uuid(),
    username,
    password,
    clubs
  })
}

exports.checkUser = function(username, password) {
  return userModel.findOne({ username }).then(res => {
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
