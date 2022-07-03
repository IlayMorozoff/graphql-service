import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';
import { AddToFavouritesInput } from './dto/add-to-favourites.input';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Query(() => [Favourite], { name: 'favourites' })
  findAll() {
    return this.favouritesService.findAll();
  }

  @Mutation(() => Favourite)
  addTrackToFavourites(
    @Args('addToFavouritesInput')
    addToFavouritesInput: AddToFavouritesInput,
  ) {
    return this.favouritesService.add(addToFavouritesInput);
  }

  // addBandToFavourites
  // addArtistToFavourites
  // addGenreToFavourites
}
