const clubModel = require('../models').Club

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

exports.addClub = async function(cid, clubName) {
  return clubModel.create({ cid: cid, clubName: clubName })
}

exports.getClubInfoByName = function(clubName) {
  return clubModel.find({ clubName: clubName })
}
