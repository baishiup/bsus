import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { DatabaseModule, generateDBRepo } from '../../database/database.module';

export const moduleName = 'CATEGORY_REPO';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, generateDBRepo(moduleName, CategoryEntity)],
})
export class CategoryModule {}
