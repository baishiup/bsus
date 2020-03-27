import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { HttpResponse } from 'src/decorators/httpResponse';
import { TagEntity } from '../tag/tag.entity';
import { PublishState } from 'src/interfaces';
import * as hljs from 'highlight.js';
import * as marked from 'marked';
import { CategoryEntity } from '../category/category.entity';

marked.setOptions({
  breaks: true,
  highlight: function(code: any) {
    return hljs.highlightAuto(code).value;
  },
});

@Injectable()
export class ArticleService {
  constructor(
    @Inject(__dirname) private readonly Repo: Repository<ArticleEntity>,
  ) {}
  async getList({
    pageSize = 1000,
    current = 1,
    category,
    tag,
    state,
    desc,
  }): Promise<ArticleEntity[]> {
    console.log(process.argv);

    const query = this.Repo.createQueryBuilder('article');
    const descKey = desc ? `article.${desc}` : 'article.updatedAt';
    if (state) {
      query.where({ state });
    }
    if (category) {
      query.where({ category });
    }
    if (tag) {
      query.innerJoinAndSelect('article.tag', 't', `t.id=${tag}`);
    }

    return await query
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .orderBy(descKey, 'DESC')
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  async getDetail(id): Promise<ArticleEntity> {
    return await this.Repo.findOne({
      where: { id },
      relations: ['category', 'tag'],
    });
  }

  async create({
    title,
    category,
    tag = '',
    description = '',
    thumb = '',
    code = '',
    keywords = '',
    state = PublishState.PUBLISH,
  }): Promise<HttpResponse | ArticleEntity> {
    return this.Repo.find({ title }).then(async existed => {
      if (existed.length) {
        return HttpResponse.error('标题已存在');
      }
      const article = new ArticleEntity();
      article.title = title;
      article.description = description;
      article.thumb = thumb;
      article.code = code;
      article.html = marked(code || '');
      article.keywords = keywords;
      article.state = state;
      if (category) {
        const c = new CategoryEntity();
        c.id = category;
        article.category = c;
      }
      if (tag) {
        article.tag = tag
          .split(',')
          .map(Number)
          .map(x => {
            const t = new TagEntity();
            t.id = x;
            return t;
          });
      }

      return await this.Repo.save(article);
    });
  }
  async update(
    id,
    {
      title,
      category,
      tag = '',
      description = '',
      thumb = '',
      code = '',
      keywords = '',
      state = PublishState.PUBLISH,
    },
  ): Promise<HttpResponse | ArticleEntity> {
    return this.Repo.findOne(id).then(async article => {
      if (!article) {
        return HttpResponse.error('文章不存在');
      } else {
        article.title = title;
        article.description = description;
        article.thumb = thumb;
        article.code = code;
        article.html = marked(code);
        article.keywords = keywords;
        article.state = state;

        if (category) {
          const c = new CategoryEntity();
          c.id = category;
          article.category = c;
        }
        if (tag) {
          article.tag = [];
          article = await this.Repo.save(article);
          article.tag = tag
            .split(',')
            .map(Number)
            .map(x => {
              const t = new TagEntity();
              t.id = x;
              return t;
            });
        }
        return await this.Repo.save(article);
      }
    });
  }

  async delete(id): Promise<HttpResponse | ArticleEntity> {
    return this.Repo.findOne(id).then(async existed => {
      return !existed
        ? HttpResponse.error('文章不存在')
        : this.Repo.remove(existed);
    });
  }
}
