import { Module } from '@nestjs/common';
import { DatabaseModule, generateDBRepo } from 'src/database/database.module';
import { MyReportEntity } from './myReport.entity';
import { MyReportService } from './myReport.service';
import { MyReportController } from './myReport.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [MyReportController],
  providers: [MyReportService, generateDBRepo(__dirname, MyReportEntity)],
})
export class MyReportModule {}
