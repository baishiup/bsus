const { httpStatus, apiStatus } = require("../constant");

function HttpSuccess({ statusCode = httpStatus.SUCCESS, message = "操作成功", status = apiStatus.SUCCESS, attribute, data }) {
  this.ctx.status = statusCode;
  this.ctx.body = {
    status,
    message,
    result: {
      attribute,
      data
    }
  };
}

class HttpForbiddenErrorClass extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.FORBIDDEN;
  }
}
class HttpUnauthorizedErrorClass extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}

module.exports = {
  HttpSuccess,
  HttpForbiddenError: message => new HttpForbiddenErrorClass(message),
  HttpUnauthorizedError: message => new HttpUnauthorizedErrorClass(message)
};
