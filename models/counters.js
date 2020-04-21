const db = require('./db')

coutersSchema = new db.Schema({
  name:String,
  id:Number
})

exports.countersSchema = coutersSchema;
