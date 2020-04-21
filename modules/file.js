const fileModel = require('../models').File
const countersModel = require('../models').Couters
const JSONError = require('../utils/JSONError')

exports.addFile = function (fid,cid,title,content,father,key) {
  fileModel.create({
    fid:fid,
    cid:cid,
    title:title,
    content:content,
    father:father,
    key:key
  })
}

exports.getFiles = function (cid) {
  return fileModel.find({cid:cid})
}

exports.getNextSequenceValue = function (sequenceName){
  return countersModel.findOneAndUpdate({name:sequenceName},{$inc: {id: 1}},{new: true});
}
