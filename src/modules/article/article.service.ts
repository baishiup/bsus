import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { HttpResponse } from 'src/decorators/httpResponse';
import { TagEntity } from '../tag/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPO') private readonly Repo: Repository<ArticleEntity>,
  ) {}
  async getList() {
    return await this.Repo.find({ relations: ['category', 'tag'] });
  }
  async create(title, category, tag) {
    return this.Repo.find({ title }).then(async existed => {
      if (existed.length) {
        return HttpResponse.error('标题已存在');
      }
      const article = new ArticleEntity();
      article.title = title;
      article.category = category;
      if (tag && tag.length) {
        article.tag = tag.split(',').map(x => {
          const t = new TagEntity();
          t.id = x;
          return t;
        });
      }

      return await this.Repo.save(article);
    });
  }
}
