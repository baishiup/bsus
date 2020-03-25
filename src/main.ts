import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/globalException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
