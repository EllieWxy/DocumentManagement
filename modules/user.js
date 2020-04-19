const userModel = require('../models').User;
const JSONError = require('../utils/JSONError');

exports.addUser = function (cid, user, password) {
  return userModel.findOne({sid: user}).then((res) => {
    if (res === null) {
      userModel.create({
        sid: user,
        password: password,
        cid: cid
      }, function (err) {
        if (err) {
          throw new JSONError(err)
        }
      })
    } else {
      throw new JSONError('账号已存在')
    }
  })
}

exports.checkUser = function (cid, user, password) {
  return userModel.findOne({sid: user}).then((res) => {
    if (res === null) {
      throw new JSONError('账号不存在', 401);
    } else {
      if (res.password !== password) {
        throw new JSONError('用户名或密码不正确!', 401);
      }
    }
  })
}
