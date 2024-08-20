import { Injectable } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  checkUser(auth: Auth): boolean {
    try {
      const dbUser = this.configService.get<string>('DATABASE_USER');
      console.log('So many layer', dbUser);
      const user = this.usersService.findOne(auth.name);
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
