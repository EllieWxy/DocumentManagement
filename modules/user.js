const userModel = require('../models').User
const JSONError = require('../utils/JSONError')

/**
 * 检查当前系统中是否存在user
 */
exports.checkExistUser = async function() {
  const user = await userModel.findOne({ sid: { $exists: true } })
  return Boolean(user)
}

exports.addUser = function(cid, user, password) {
  return userModel.findOne({ sid: user }).then(res => {
    if (res === null) {
      userModel.create(
        {
          sid: user,
          password: password,
          cid: cid
        },
        function(err) {
          if (err) {
            throw new JSONError(err)
          }
        }
      )
    } else {
      throw new JSONError('账号已存在')
    }
  })
}

exports.checkUser = function(user, password) {
  return userModel.findOne({ sid: user }).then(res => {
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
