import { Controller, Get, HttpStatus, Param, Res, Scope } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller({ path: 'users', scope: Scope.REQUEST })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const test = await this.usersService.findOne(id);
    console.log(test);
    res.status(HttpStatus.CREATED).send({ code: 1, message: 'Succeeded' });
  }
}
