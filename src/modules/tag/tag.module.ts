import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { TagController } from './tag.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [TagService, generateDBRepo(__dirname, TagEntity)],
})
export class TagModule {}
