import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import configuration from './config/configuration';
import { number } from 'zod';
import { ConfigService } from '@nestjs/config';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); global filter
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port ?? 3000);
}
bootstrap();
