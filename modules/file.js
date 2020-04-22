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

exports.fatherAddChild = function(father,fid,title){
  return fileModel.findOneAndUpdate({fid:father},{"$push":{"childNodes":{fid:fid,title:title}}});
}

exports.ifHaveChild = function(fid){
  return fileModel.find({fid:fid})
}

exports.getFiles = function (cid,father) {
  return fileModel.find({cid:cid,father:father})
}

exports.getNextSequenceValue = function (sequenceName){
  return countersModel.findOneAndUpdate({name:sequenceName},{$inc: {id: 1}},{new: true});
}
