import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(name: string): User {
    const user = this.users.find((user) => user.name === name);
    if (!user) throw new NotFoundException(`User with name ${name} not found`);
    return user;
  }
}
