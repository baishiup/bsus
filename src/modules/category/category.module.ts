import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { DatabaseModule, generateDBRepo } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, generateDBRepo(__dirname, CategoryEntity)],
})
export class CategoryModule {}
