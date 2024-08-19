import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { UUID } from 'crypto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    // throw new Error('Method not implemented.');
    return this.cats;
  }

  findOne(id: UUID): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  updateOne(id: UUID, cat: Cat): Cat {
    const cats = [
      {
        id: '123',
        name: 'cat1',
        age: 1,
        breed: 'breed1',
      },
    ];
    const index = cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    this.cats[index] = cat;
    return cat;
  }
}
