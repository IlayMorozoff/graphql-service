import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesResolver } from './favourites.resolver';

@Module({
  providers: [FavouritesResolver, FavouritesService]
})
export class FavouritesModule {}
