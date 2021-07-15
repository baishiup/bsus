import { Controller, Inject, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/decorators/httpResponse';
import { Repository } from 'typeorm';
import { MyReportEntity } from './myReport.entity';

@Injectable()
export class MyReportService {
  constructor(
    @Inject(__dirname) private readonly Repo: Repository<MyReportEntity>,
  ) {}
  async getList({ pageSize = 1000, current = 1 }) {
    const query = this.Repo.createQueryBuilder('myReport');
    return await query
      .orderBy('createdAt', 'DESC')
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }
  async create({ desc = '', date }) {
    const newReport = new MyReportEntity();
    newReport.desc = desc;
    newReport.date = Number(date);
    newReport.data = '';
    return await this.Repo.save(newReport);
  }
  async delete(id) {
    return this.Repo.findOne(id).then(async existed => {
      return !existed
        ? HttpResponse.error('内容不存在')
        : this.Repo.remove(existed);
    });
  }
  async getDetail(id: string) {
    return this.Repo.findOne(id);
  }
  async editItem(id: string, data: string) {
    const record = await this.Repo.findOne(id);
    if (!record) {
      return HttpResponse.error('内容不存在');
    }
    record.data = data;
    return await this.Repo.save(record);
  }
}
