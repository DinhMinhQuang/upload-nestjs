import {
  HttpCode,
  Controller,
  Get,
  Post,
  Req,
  Header,
  Query,
  Redirect,
  Param,
  Body,
  Put,
  Res,
  HttpStatus,
  HttpException,
  BadRequestException,
  UseFilters,
  ParseIntPipe,
  ParseUUIDPipe,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ZodValidateSchema } from './pipe/zodValidation.pipe';
import { randomUUID, UUID } from 'crypto';
import { ValidatorPipe } from './pipe/validation.pipe';
import { Roles } from 'src/common/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
// import { createCatSchema } from './zod/createCatSchema.validate';

@Controller('cats')
// @UseGuards(AuthGuard, RolesGuard)
// @UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  //   @Get('aaaa*aaaa') A wildcard in the middle of the route is only supported by express.
  //   @Get()
  //   async findAll(@Req() req: Request, @Res() res: Response) {
  //     console.log(req.body);
  //     res.status(HttpStatus.OK).send({
  //       code: 1,
  //       message: 'Succeeded',
  //       data: [],
  //     });
  //   }

  @Get()
  // @UseFilters(HttpExceptionFilter)
  async findAll(): Promise<Cat[]> {
    try {
      const array = this.catsService.findAll();
      return array;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // throw new ForbiddenException();
      //   throw new BadRequestException('Something bad happened', {
      //     cause: new Error(),
      //     description: 'Some error description',
      //   });
    }
  }

  @Post()
  @Header('Cache-Control', 'none')
  @UsePipes(new ZodValidateSchema(createCatSchema))
  @Roles(['admin'])
  async create(
    @Body() createCatDto: CreateCatDto,
    @Res() res: Response,
  ): Promise<any> {
    const id = randomUUID();
    createCatDto.id = id;
    this.catsService.create(createCatDto);
    res
      .status(HttpStatus.CREATED)
      .send({ code: 1, message: 'Succeeded', data: createCatDto });
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id')
  // findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ): string {
  //   console.log(id);
  //   return `This action returns a #${id} cat`;
  // }

  @Get(':uuid')
  findOne(@Query('id', new ParseUUIDPipe({ version: '4' })) id: UUID) {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles(['admin'])
  async update(
    @Param('id') id: UUID,
    @Body(new ValidatorPipe()) updateCatDto: CreateCatDto,
  ): Promise<any> {
    const params = { ...updateCatDto, id };
    let update: CreateCatDto;
    try {
      update = this.catsService.updateOne(id, params);
    } catch (error) {
      return {
        code: -1,
        message: error.message,
      };
    }
    return update;
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string): string {
  //     return `This action returns a #${id} cat`;
  //   }
}
