let JSONError = function (message,status) {
  this.message = message;
  this.status = status || 500;
}

module.exports = JSONError;
