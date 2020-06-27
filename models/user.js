const db = require('./db')

exports.userSchema = new db.Schema({
  staffId: String,
  password: String,
  nickname: String,
  club: String,
  email: String,
  authority: [Number],
  position: String
})
