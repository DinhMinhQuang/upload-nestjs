import { UUID } from 'crypto';
import { z } from 'zod';

export class CreateCatDto {
  id: UUID;
  name: string;
  age: number;
  breed: string;
}

export const createCatSchema = z.object({
  name: z.string(),
  age: z.number().int(),
  breed: z.string().min(1),
});
