import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { TagController } from './tag.controller';

export const moduleName = 'TAG_REPO';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [TagService, generateDBRepo(moduleName, TagEntity)],
})
export class TagModule {}
