import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { HttpResponse } from 'src/decorators/httpResponse';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPO') private readonly Repo: Repository<TagEntity>,
  ) {}

  async getList() {
    return await this.Repo.createQueryBuilder('tag')
      .leftJoinAndSelect('tag.articles', 'articles')
      .getMany();
  }

  async create(name) {
    return this.Repo.find({ name }).then(async existed => {
      if (existed.length) {
        return HttpResponse.error('标签已存在');
      }
      const tag = new TagEntity();
      tag.name = name;
      return await this.Repo.save(tag);
    });
  }

  async update(id, name) {
    const tag = await this.Repo.findOne(id);
    if (tag === undefined) {
      return HttpResponse.error('标签不存在');
    }
    tag.name = name;
    return await this.Repo.update(id, tag);
  }

  async delete(id) {
    const tag = await this.Repo.createQueryBuilder('tag')
      .whereInIds(id)
      .leftJoinAndSelect('tag.articles', 'articles')
      .getMany();
    if (!tag.length) {
      return HttpResponse.error('标签不存在');
    }
    if (tag[0].articles.length !== 0) {
      return HttpResponse.error('标签下还有文章，先移出文章下的标签');
    }
    return await this.Repo.remove(tag);
  }
}
