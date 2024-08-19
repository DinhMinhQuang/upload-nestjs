import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AllExceptionsFilter } from './common/filter/all-exception.filter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_FILTER',
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
    // {
    //   provide: 'APP_GUARD',
    //   useClass: RolesGuard,
    // },

    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .exclude(
//         { path: 'cats', method: RequestMethod.GET },
//         { path: 'cats', method: RequestMethod.POST },
//       )
//       .forRoutes(CatsController);
//   }
// }
