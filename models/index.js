const mongoose = require('mongoose');

const db = require('./db');
const club = require('./club');
const file = require('./file');
const user = require('./user');
const counters = require('./counters');

const Counters = mongoose.model('CountersModel',counters.countersSchema);
Counters.create({name:"counter",id:0});

exports.User = mongoose.model('UserModel',user.userSchema);
exports.Club = mongoose.model('ClubModel',club.clubSchema);
exports.File = mongoose.model('FileModel',file.fileSchema);
exports.Couters = Counters;


exports.mongoUrl = db.mongoUrl;
