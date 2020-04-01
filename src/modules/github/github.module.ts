import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubEntity } from './github.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [GithubController],
  providers: [GithubService, generateDBRepo(__dirname, GithubEntity)],
})
export class GithubModule {}
