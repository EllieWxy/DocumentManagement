const db = require('./db')

exports.fileSchema = new db.Schema({
  cid:String,
  sid:String,
  content:String,
  title:String,
  father:String,
  fid:String,
  key:String,
  tags:[Number],
  createTime:Date,
  updateTime:Date,
  keyword:String,
  childNodes:[{
    title: String,
    fid:String
  }],
  authority: [{
    sid:String,
    auth:[Number]
  }],
  isLeaf:Boolean
})
