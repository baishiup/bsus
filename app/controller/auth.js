"use strict";

const Controller = require("egg").Controller;
const { apiStatus } = require("../constant");
const { HttpSuccess } = require("../decorators");
const { str2Md5 } = require("../helpers");
const JWT = require("jsonwebtoken");

class AuthController extends Controller {
  async dologin() {
    const { username, password } = this.ctx.request.query;
    const user = await this.ctx.model.Auth.findOne({ where: { username } });
    if (!user) {
      return HttpSuccess.call(this, {
        status: apiStatus.ERROR,
        message: "用户不存在"
      });
    }
    if (str2Md5(password) !== user.password) {
      return HttpSuccess.call(this, {
        status: apiStatus.ERROR,
        message: "密码不正确"
      });
    }
    const token = JWT.sign(
      {
        username
      },
      this.config.jwtHandler.secret,
      {
        expiresIn: 60 * 60 * 24
      }
    );
    return HttpSuccess.call(this, {
      message: "登录成功",
      data: { token }
    });
  }
  async register() {
    const { username, password } = this.ctx.request.query;
    return this.ctx.model.Auth.findOne({ where: { username } }).then(existed => {
      return existed
        ? HttpSuccess.call(this, {
            status: apiStatus.ERROR,
            message: "账号已存在"
          })
        : this.ctx.model.Auth.create({ username, password: str2Md5(password) }).then(newAuth => {
            return HttpSuccess.call(this, {
              message: "注册成功",
              data: newAuth
            });
          });
    });
  }
}

module.exports = AuthController;
