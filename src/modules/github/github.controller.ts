import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly service: GithubService) {}
  @Get('getRepos')
  getRepos() {
    return this.service.getRepos();
  }

  @Get('refreshRepo')
  refreshRepo() {
    return this.service.getReposFromGithub();
  }
}
