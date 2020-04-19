const mongoose = require('mongoose');

const db = require('./db')
const club = require('./club')
const file = require('./file')
const user = require('./user')


exports.User = mongoose.model('UserModel',user.userSchema);
exports.Club = mongoose.model('ClubModel',club.clubSchema);
exports.File = mongoose.model('FileModel',file.fileSchema);
exports.mongoUrl = db.mongoUrl;
