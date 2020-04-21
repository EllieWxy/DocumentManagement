const db = require('./db')

exports.userSchema = new db.Schema({
  cid:[String],
  sid:String,
  username:String,
  password:String,
  email:String,
  authority:[Number],
  position: String,
})
