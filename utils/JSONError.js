let JSONError = function (message,status) {
  this.message = {message: message,status:status};
  this.status = status || 500;
}

module.exports = JSONError;
