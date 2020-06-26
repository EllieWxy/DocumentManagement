const { v1: uuid } = require('uuid')
const clubModel = require('../models').Club
const JSONError = require('../utils/JSONError')

/**
 * 检查当前系统中是否存在club
 */
exports.checkExistClub = async function() {
  const club = await clubModel.findOne({ cid: { $exists: true } })
  return Boolean(club)
}

exports.getClubInfo = function(cid) {
  return clubModel.findOne({ cid: cid })
}

exports.addClub = async function(club) {
  const { clubName } = club
  const res = await clubModel.findOne({ clubName })
  if (res !== null) {
    throw new JSONError('社团已存在')
  }
  return clubModel.create({ cid: uuid(), clubName: clubName })
}

exports.getClubInfoByName = function(clubName) {
  return clubModel.find({ clubName })
}
