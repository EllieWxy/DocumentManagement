const mongoose = require('mongoose');
const config = require('../config');

const mongoUser = (!config.db.user || !config.db.password) ? '' : config.db.user + ':' + config.db.password + '@';
const mongoUrl = `mongodb://${mongoUser}${config.db.host}:${config.db.port}/${config.db.db}`;
mongoose.connect(mongoUrl)
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB连接错误'));

const Schema = mongoose.Schema;

const clubSchema = new Schema({
  cid:String,
  clubName:String,
  department:{
    did:String,
    dName:String,
  },
  position:[String],
  tags:{
   tid:String,
   tName:String
  },
  groups:[String]
})

const userSchema = new Schema({
  cid:String,
  sid:String,
  username:String,
  password:String,
  email:String,
  authority:[Number],
  position: String,
})

const fileSchema = new Schema({
  cid:String,
  sid:String,
  content:String,
  title:String,
  father:String,
  fid:String,
  tags:[Number],
  createTime:Date,
  updateTime:Date,
  key:String,
  authority: [{
    sid:String,
    auth:[Number]
  }]
})

exports.User = mongoose.model('UserModel',userSchema);
exports.Club = mongoose.model('ClubModel',clubSchema);
exports.File = mongoose.model('FileModel',fileSchema);
exports.mongoUrl = mongoUrl;
