import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { HttpInterceptor } from './interceptors/http.interceptor';

import { ScheduleModule } from '@nestjs/schedule';

import { GlobalExceptionFilter } from './filters/globalException.filter';

import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { TagModule } from './modules/tag/tag.module';
import { QiniuController } from './modules/qiniu/qiniu.controller';
import { GithubModule } from './modules/github/github.module';
import { SettingModule } from './modules/setting/setting.module';
import { MyReportModule } from './modules/myReport/myReport.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CategoryModule,
    ArticleModule,
    TagModule,
    GithubModule,
    SettingModule,
    MyReportModule,
  ],
  controllers: [QiniuController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class AppModule {}
