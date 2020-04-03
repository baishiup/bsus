import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingEntity } from './setting.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [SettingService, generateDBRepo(__dirname, SettingEntity)],
})
export class SettingModule {}
