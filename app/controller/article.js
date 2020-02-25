"use strict";

const Controller = require("egg").Controller;
const { httpStatus, apiStatus } = require("../constant");
const { HttpSuccess } = require("../decorators");
const { PublishState } = require("../constant");

class ArticleController extends Controller {
  async get() {
    const { id } = this.ctx.params;
    return this.ctx.model.Article.findOne({
      where: { id, state: PublishState.published },
      include: [{ model: this.ctx.model.Category }],
      attributes: { exclude: ["category_id"] }
    }).then(tag => {
      HttpSuccess.call(this, {
        data: tag
      });
    });
  }
  async getList() {
    const { pageSize = 10, page = 1 } = this.ctx.request.query;
    return this.ctx.model.Article.findAndCountAll({
      where: {
        state: PublishState.published
      },
      include: [{ model: this.ctx.model.Category }],
      attributes: { exclude: ["category_id"] },
      order: [["created_at", "desc"]],
      offset: (Number(page) - 1) * pageSize,
      limit: Number(pageSize)
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
  async create() {
    const { title, description, thumb, code, content, keywords, state, category_id, tags } = this.ctx.request.body;
    const existedArticle = await this.ctx.model.Article.findAll({ where: { title } });
    if (existedArticle.length) {
      HttpSuccess.call(this, {
        message: "文章标题已存在",
        status: apiStatus.ERROR
      });
    } else {
      const newArticle = await this.ctx.model.Article.create({ title, description, thumb, code, content, keywords, state, category_id, tags });
      HttpSuccess.call(this, {
        statusCode: httpStatus.CREATED,
        data: newArticle
      });
    }
  }
  async delete() {
    const { id } = this.ctx.params;
    let newArt = await this.ctx.model.Article.update({ state: PublishState.deleted }, { where: { id } });
    HttpSuccess.call(this, {
      message: "删除成功"
    });
    // return this.ctx.model.Article.destroy({ where: { id } }).then(number => {
    //   HttpSuccess.call(this, {
    //     data: number
    //   });
    // });
  }
  async update() {
    const { id } = this.ctx.params;
    const { title, description, thumb, content, keywords, state, category_id, tag_ids } = this.ctx.request.body;
    const data = {
      title,
      description,
      thumb,
      content,
      keywords,
      state,
      category_id,
      tag_ids
    };
    return this.ctx.model.Article.update(data, { where: { id } }).then(article => {
      HttpSuccess.call(this, {
        data: article
      });
    });
  }
}

module.exports = ArticleController;
