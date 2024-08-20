import { Injectable } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  checkUser(auth: Auth): boolean {
    try {
      const user = this.usersService.findOne(auth.name);
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
