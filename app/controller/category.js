"use strict";

const Controller = require("egg").Controller;
const { httpStatus, apiStatus } = require("../constant");
const { HttpSuccess } = require("../decorators");

class CategoryController extends Controller {
  async getList() {
    const { pageSize = 100, page = 1 } = this.ctx.request.query;
    return this.ctx.model.Category.findAndCountAll({
      where: {},
      offset: (Number(page) - 1) * pageSize,
      limit: Number(pageSize),
      order: [["created_at", "desc"]],
      include: [
        {
          model: this.ctx.model.Article,
          attributes: { exclude: ["category_id", "content", "code"] }
        }
      ]
    }).then(list => {
      HttpSuccess.call(this, {
        attribute: {
          count: list.count,
          page,
          pageSize
        },
        data: list.rows
      });
    });
  }
  async get() {
    const { id } = this.ctx.params;
    return this.ctx.model.Category.findOne({ where: { id } }).then(tag => {
      HttpSuccess.call(this, {
        data: tag
      });
    });
  }
  async create() {
    const { name, thumb } = this.ctx.request.body;
    return this.ctx.model.Category.findAll({ where: { name } }).then(existedTag => {
      return existedTag.length
        ? HttpSuccess.call(this, {
            message: "分类已存在",
            status: apiStatus.ERROR
          })
        : this.ctx.model.Category.create({ name, thumb }).then(newTag => {
            HttpSuccess.call(this, {
              statusCode: httpStatus.CREATED,
              data: newTag
            });
          });
    });
  }
  async delete() {
    const { id } = this.ctx.params;
    return this.ctx.model.Category.destroy({ where: { id } }).then(number => {
      HttpSuccess.call(this, {
        data: number
      });
    });
  }
  async update() {
    const { id } = this.ctx.params;
    const { name } = this.ctx.request.body;
    return this.ctx.model.Category.update({ name }, { where: { id } }).then(newTag => {
      HttpSuccess.call(this, {
        data: newTag
      });
    });
  }
}

module.exports = CategoryController;
