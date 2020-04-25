const fileModel = require('../models').File
const countersModel = require('../models').Couters
const JSONError = require('../utils/JSONError')

exports.getNextSequenceValue = function (sequenceName) {
  return countersModel.findOneAndUpdate({name: sequenceName}, {$inc: {id: 1}}, {new: true});
}

exports.addFile = function (fid, cid, title, content, father, key) {
  fileModel.create({
    fid: fid,
    cid: cid,
    title: title,
    content: content,
    father: father,
    key: key
  })
}

exports.fatherAddChild = function (father, fid, title) {
  return fileModel.findOneAndUpdate({fid: father}, {"$push": {"childNodes": {fid: fid, title: title}}});
}

exports.ifHaveChild = function (fid) {
  return fileModel.find({fid: fid})
}

getFiles = async function (cid, fid) {
  const res = await fileModel.find({cid: cid, fid: fid},{title:1,fid:1,childNodes:1})
  let tree = res[0]
  if (!tree || tree.childNodes.length === 0) {
    return tree
  }

  tree["_doc"]["child"] = []
  for(item of tree.childNodes){
    tree["_doc"]["child"].push(await getFiles(cid, item.fid));
  }
  return tree
}

exports.getFiles = getFiles

exports.getFileByID = function(cid,fid){
  return fileModel.findOne({cid:cid,fid:fid})
}

exports.updateFile = function (cid,fid,content) {
  return fileModel.findOneAndUpdate({cid:cid,fid:fid},{"$set":{"content":content}}, {new: true})
}

exports.deleteFile = function (cid,fid) {
  return fileModel.remove({cid:cid,fid:fid})
}

