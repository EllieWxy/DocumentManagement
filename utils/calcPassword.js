const crypto = require('crypto')
const { salt } = require('../config')

module.exports = function(password) {
  return crypto
    .createHmac('sha256', salt)
    .update(String(password))
    .digest('hex')
}

