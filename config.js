module.exports = {
  db : {
    user : process.env.MONGO_USER || '',
    password : process.env.MONGO_PASSWORD || '',
    host : process.env.MONGO_HOST || '127.0.0.1',
    port : process.env.MONGO_PORT || '27017',
    db : 'documentManagement'
  },
  PORT : process.env.PROT || 3001,
  keys : ['some secret hurr'],
  salt : 'some salts' ,
};
