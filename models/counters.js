const db = require('./db')

coutersSchema = new db.Schema({
  name:String,
  fileID:Number,
  clubID:Number
})

exports.countersSchema = coutersSchema;
