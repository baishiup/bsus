const { httpStatus } = require("../constant");

module.exports = options => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = { message: error.message || "服务器异常" };
    }
  };
};
