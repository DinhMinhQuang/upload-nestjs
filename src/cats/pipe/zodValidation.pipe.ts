import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidateSchema implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metaData: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        data: error.errors,
      });
    }
  }
}
