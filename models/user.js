const db = require('./db')

exports.userSchema = new db.Schema({
  uid: String,
  username: String,
  password: String,
  clubs: [String],
  email: String,
  authority: [Number],
  position: String
})
