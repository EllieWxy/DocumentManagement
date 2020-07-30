const fileModel = require('../models').File
const JSONError = require('../utils/JSONError')

exports.addFile = function (fid, cid, title, content, father, keyword) {
  return fileModel.create({
    fid: fid,
    cid: cid,
    title: title,
    content: content,
    father: father,
    keyword: keyword,
    key:fid,
  })
}

exports.fatherAddChild = function (father, fid, title) {
  return fileModel.findOneAndUpdate({fid: father}, {"$push": {"childNodes": {fid: fid, title: title}}});
}

exports.fatherRemoveChild = async function (cid,fid) {
  const file = await fileModel.findOne({fid})
  const father = file.father
  return await fileModel.findOneAndUpdate({fid:father},{"$pull": {"childNodes" : {fid}}})
}

exports.fileChangeFather = async function(cid,fid,father){
  return await fileModel.findOneAndUpdate({cid:cid,fid:fid},{"$set":{father:father}})
}

exports.ifHaveChild = function (fid) {
  return fileModel.find({fid: fid})
}

getFiles = async function (cid, fid) {
  const res = await fileModel.find({cid:cid,fid:fid},{title:1,fid:1,father:1,childNodes:1})
  let tree = res[0]
  if (!tree) {
    return tree
  }
  tree["_doc"]["key"] = tree["_doc"]["fid"]

  tree["_doc"]["children"] = []
  for(item of tree.childNodes){
    tree["_doc"]["children"].push(await getFiles(cid, item.fid));
  }
  if(tree.childNodes.length === 0){
    tree["_doc"]["isLeaf"] = true
  }
  return tree
}

getRootFiles = async function(cid){
  return fileModel.find({cid:cid,father:{$exists:false}})
}

exports.getFiles = async function(cid){
  let fileRoot = await getRootFiles(cid)
  let res = []
  for(let file of fileRoot){
    res.push(await getFiles(cid,file.fid))
  }
  return res
}

exports.getFileByID = function(cid,fid){
  return fileModel.findOne({cid:cid,fid:fid})
}

exports.updateFile = function (cid,fid,title,content) {
  let update = {"$set":{}}
  if(title){
    update["$set"]["title"] = title
  }
  if(content){
    update["$set"]["content"] = content
  }
  return fileModel.findOneAndUpdate({cid:cid,fid:fid},update,{new: true})
}

exports.deleteFile = function (cid,fid) {
  return fileModel.findOne({cid:cid,fid: fid}).then(async res => {
    if(res === null){
      throw new JSONError('文档不存在',403)
    }
    deleteFiles(cid,fid)
    await fileModel.deleteOne({cid:cid,fid:fid})
    if(res.father){
      return await fileModel.updateOne({fid:res.father},{$pull:{childNodes:{fid:fid}}})
    }
  })
}

deleteFiles = function(cid,fid){
  return fileModel.findOne({cid:cid,fid:fid}).then(async  res => {
    if(res.childNodes && res.childNodes.length > 0){
      res.childNodes.forEach(async item => {
        await deleteFiles(cid,item.fid);
      })
      await fileModel.deleteOne(cid,fid)
    }
  })
}

exports.searchFile = function (cid,search) {
  return fileModel.find({$or:[{title:{$regex:search,'$options':'i'}},
      {content:{$regex: search,'$options':'i'}},{keyword:{$regex: search,'$options':'i'}}]})
}



