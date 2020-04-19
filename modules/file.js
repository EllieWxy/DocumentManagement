const fileModel = require('../models').File
const JSONError = require('../utils/JSONError')

exports.addFile = function (cid,title,content,father,key) {
  fileModel.create({
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
