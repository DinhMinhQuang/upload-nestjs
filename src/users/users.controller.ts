import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Scope,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneParams } from './dto/findOne-params.dto';

@Controller({ path: 'users', scope: Scope.REQUEST })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(
    @Param() params: FindOneParams,
    @Res() res: Response,
  ): Promise<any> {
    console.log(params);
    const test = await this.usersService.findOne(params.id);
    console.log(test);
    res.status(HttpStatus.CREATED).send({ code: 1, message: 'Succeeded' });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }
}
