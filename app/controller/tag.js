"use strict";

const Controller = require("egg").Controller;
const { httpStatus, apiStatus } = require("../constant");
const { HttpSuccess } = require("../decorators");

class TagController extends Controller {
  async getList() {
    return this.ctx.model.Tag.findAndCountAll({ where: {} }).then(list => {
      HttpSuccess.call(this, {
        data: list.rows
      });
    });
  }
  async create() {
    const { name } = this.ctx.request.body;

    return this.ctx.model.Tag.findAll({ where: { name } }).then(existedTag => {
      return existedTag.length
        ? HttpSuccess.call(this, {
            message: "标签已存在",
            status: apiStatus.ERROR
          })
        : this.ctx.model.Tag.create({ name }).then(newTag => {
            HttpSuccess.call(this, {
              statusCode: httpStatus.CREATED,
              data: newTag
            });
          });
    });
  }
  async delete() {
    const { id } = this.ctx.params;
    return this.ctx.model.Tag.destroy({ where: { id } }).then(number => {
      HttpSuccess.call(this, {
        data: number
      });
    });
  }
}

module.exports = TagController;
