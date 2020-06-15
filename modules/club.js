const clubModel = require('../models').Club

exports.getClubInfo = function (cid) {
  return clubModel.findOne({cid:cid})
}
