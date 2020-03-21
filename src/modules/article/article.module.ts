import { Module } from '@nestjs/common';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { DatabaseModule, generateDBRepo } from '../../database/database.module';

export const moduleName = 'ARTICLE_REPO';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, generateDBRepo(moduleName, ArticleEntity)],
})
export class ArticleModule {}
