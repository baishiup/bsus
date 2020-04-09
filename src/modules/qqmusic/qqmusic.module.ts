import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { QQmusicController } from './qqmusic.controller';
import { QQmusicService } from './qqmusic.service';
import { QQmusicEntity } from './qqmusic.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [QQmusicController],
  providers: [QQmusicService, generateDBRepo(__dirname, QQmusicEntity)],
})
export class QQmusicModule {}
