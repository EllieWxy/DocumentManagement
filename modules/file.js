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

getAllFiles = async function (cid, fid) {
  const res = await fileModel.find({cid: cid, fid: fid},{title:1,fid:1,childNodes:1})
  let tree = res[0]
  if (!tree || tree.childNodes.length === 0) {
    return tree
  }

  tree["_doc"]["child"] = []
  for(item of tree.childNodes){
    tree["_doc"]["child"].push(await getAllFiles(cid, item.fid));
  }
  return tree
}

exports.getAllFiles = getAllFiles

exports.getFileDetail = function(cid,fid){
  return fileModel.findOne({cid:cid,fid:fid})
}

exports.saveFile = function (cid,fid,content) {
  return fileModel.findOneAndUpdate({cid:cid,fid:fid},{$set:{content:content}})
}


