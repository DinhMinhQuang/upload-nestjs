import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule, UsersModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
