import { Module } from '@nestjs/common';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { DatabaseModule, generateDBRepo } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, generateDBRepo(__dirname, ArticleEntity)],
})
export class ArticleModule {}
