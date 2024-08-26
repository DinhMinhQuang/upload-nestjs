import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  constructor(private configService: ConfigService) {}

  findAll(): User[] {
    return this.users;
  }

  findOne(name: string): User {
    console.log('env', this.configService.get<string>('port'));
    const user = this.users.find((user) => user.name === name);
    if (!user) throw new NotFoundException(`User with name ${name} not found`);
    return user;
  }
}
