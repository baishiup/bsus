import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GithubEntity } from './github.entity';
import Axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpResponse } from 'src/decorators/httpResponse';

@Injectable()
export class GithubService {
  constructor(
    @Inject(__dirname) private readonly Repo: Repository<GithubEntity>,
  ) {}
  async getRepos() {
    const repos = await this.Repo.findOne({ name: 'repos' });
    return HttpResponse.success().setList(repos ? JSON.parse(repos.data) : []);
  }

  async getReposFromGithub() {
    const { data } = await Axios.get(
      'https://api.github.com/users/baishiup/repos',
    );
    console.log('getReposFromGithub---');
    if (!data) {
      return;
    }
    const newRecord = new GithubEntity();
    newRecord.name = 'repos';
    newRecord.data = JSON.stringify(
      data
        .filter(x => !x.fork)
        .map(x => ({
          name: x.name,
          full_name: x.full_name,
          html_url: x.html_url,
          description: x.description,
          updated_at: x.updated_at,
          language: x.language,
        })),
    );
    return await this.Repo.save(newRecord);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleSetRepos() {
    console.log('------------schedule-----handleSetRepos------');
    this.getReposFromGithub();
  }
}
