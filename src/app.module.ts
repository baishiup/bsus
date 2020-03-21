import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { GlobalExceptionFilter } from './filters/globalException.filter';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [CategoryModule, ArticleModule, TagModule],
  controllers: [],
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
