const crypto = require('crypto')
const { salt } = require('../config')

export default function(password) {
  return crypto
    .createHmac('sha256', salt)
    .update(String(password))
    .digest('hex')
}
