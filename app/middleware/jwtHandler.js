const JWT = require("jsonwebtoken");
const { httpStatus } = require("../constant");

module.exports = options => {
  return async function jwtHandler(ctx, next) {
    if (ctx.method.toLowerCase() === "get") {
      return await next();
    }

    const token = ctx.request.header.token;
    if (!token) {
      ctx.status = httpStatus.UNAUTHORIZED;
      ctx.body = { message: "无权访问" };
      return;
    }

    try {
      const decode = JWT.verify(token, options.secret);
      if (!decode || !decode.username) {
        ctx.status = httpStatus.UNAUTHORIZED;
        ctx.body = { message: "无权访问" };
        return;
      }
      if (Date.now() - decode.expire > 0) {
        ctx.status = httpStatus.UNAUTHORIZED;
        ctx.body = { message: "token已过期" };
        return;
      }
      await next();
    } catch (error) {
      ctx.status = httpStatus.UNAUTHORIZED;
      ctx.body = { message: "无权访问" };
      return;
    }
  };
};
