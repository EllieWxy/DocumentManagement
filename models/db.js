const mongoose = require('mongoose');
const config = require('../config');

const mongoUser = (!config.db.user || !config.db.password) ? '' : config.db.user + ':' + config.db.password + '@';
const mongoUrl = `mongodb://${mongoUser}${config.db.host}:${config.db.port}/${config.db.db}`;
mongoose.connect(mongoUrl)
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB连接错误'));

exports.Schema = mongoose.Schema;
exports.mongoUrl = mongoUrl;
