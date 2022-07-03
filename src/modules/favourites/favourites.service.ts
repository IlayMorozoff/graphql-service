import { Injectable } from '@nestjs/common';
import { AddToFavouritesInput } from './dto/add-to-favourites.input';

@Injectable()
export class FavouritesService {
  add(addToFavouritesInput: AddToFavouritesInput) {
    return 'This action adds a new favourite';
  }

  findAll() {
    return `This action returns all favourites`;
  }

  findOne(id: string) {
    return `This action returns a #${id} favourite`;
  }

  update(id: string) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favourite`;
  }
}
