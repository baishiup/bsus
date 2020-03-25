import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { HttpResponse } from 'src/decorators/httpResponse';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(__dirname)
    private readonly Repo: Repository<CategoryEntity>,
  ) {}
  async getList({ pageSize = 1000, current = 1 }): Promise<any> {
    return await this.Repo.createQueryBuilder('category')
      .leftJoinAndSelect('category.articles', 'articles')
      .skip((current - 1) * pageSize) // 跳过条数
      .take(pageSize) // pageSize
      .getMany();
  }

  async create(name, thumb = ''): Promise<HttpResponse | CategoryEntity> {
    return this.Repo.find({ name }).then(async existed => {
      if (existed.length) {
        return HttpResponse.error('分类已存在');
      }
      const category = new CategoryEntity();
      category.name = name;
      category.thumb = thumb;
      return await this.Repo.save(category);
    });
  }
  async update(id, name = '', thumb = ''): Promise<any> {
    const category = await this.Repo.findOne(id);
    if (category === undefined) {
      return HttpResponse.error('分类不存在');
    }
    category.name = name;
    category.thumb = thumb;
    return await this.Repo.update(id, category);
  }

  async delete(id): Promise<any> {
    const category = await this.Repo.findOne(id);
    if (category === undefined) {
      return HttpResponse.error('分类不存在');
    }
    return await this.Repo.remove(category);
  }
}
