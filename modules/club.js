const clubModel = require('../models').Club

exports.getClubInfo = function (cid) {
  return clubModel.findOne({cid:cid})
}

exports.addClub = async function (cid,clubName) {
  return clubModel.create({cid:cid,clubName:clubName})
}

exports.getClubInfoByName = function (clubName) {
  return clubModel.find({clubName:clubName})
}
