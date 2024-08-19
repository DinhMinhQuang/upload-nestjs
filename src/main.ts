import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); global filter
  app.use(new LoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
