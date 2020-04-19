const db = require('./db')

exports.clubSchema = new db.Schema({
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





