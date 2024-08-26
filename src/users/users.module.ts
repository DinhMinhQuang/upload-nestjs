import { Module, Scope } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
