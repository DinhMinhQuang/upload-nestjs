import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  checkUser(@Body() test: any): boolean {
    return this.authService.checkUser({
      name: test.test,
      type: 'ADMIN',
    });
  }
}
