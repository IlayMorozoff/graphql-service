import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';
import { AddToFavouritesInput } from './dto/add-to-favourites.input';
import { RemoveFromFavouritesInput } from './dto/remove-from-favourites.input';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Query(() => Favourite, { name: 'favourites' })
  findAll(@Context('req') req: Request) {
    const token = req.headers.authorization;
    return this.favouritesService.findAll(token);
  }

  @Mutation(() => Favourite)
  addTrackToFavourites(
    @Args('idTrack')
    idTrack: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: AddToFavouritesInput = {
      id: idTrack,
      type: 'tracks',
    };
    return this.favouritesService.add(data, token);
  }

  @Mutation(() => Favourite)
  addBandToFavourites(
    @Args('idBand')
    idBand: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: AddToFavouritesInput = {
      id: idBand,
      type: 'bands',
    };
    return this.favouritesService.add(data, token);
  }

  @Mutation(() => Favourite)
  addArtistToFavourites(
    @Args('idArtist')
    idArtist: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: AddToFavouritesInput = {
      id: idArtist,
      type: 'bands',
    };
    return this.favouritesService.add(data, token);
  }

  @Mutation(() => Favourite)
  addGenreToFavourites(
    @Args('idGenre')
    idGenre: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: AddToFavouritesInput = {
      id: idGenre,
      type: 'bands',
    };
    return this.favouritesService.add(data, token);
  }

  @Mutation(() => Favourite)
  removeTrackFromFavourites(
    @Args('idTrack')
    idTrack: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: RemoveFromFavouritesInput = {
      id: idTrack,
      type: 'tracks',
    };
    return this.favouritesService.remove(data, token);
  }

  @Mutation(() => Favourite)
  removeBandFromFavourites(
    @Args('idBand')
    idBand: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: RemoveFromFavouritesInput = {
      id: idBand,
      type: 'bands',
    };
    return this.favouritesService.remove(data, token);
  }

  @Mutation(() => Favourite)
  removeArtistFromFavourites(
    @Args('idArtist')
    idArtist: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: RemoveFromFavouritesInput = {
      id: idArtist,
      type: 'bands',
    };
    return this.favouritesService.remove(data, token);
  }

  @Mutation(() => Favourite)
  removeGenreFromFavourites(
    @Args('idGenre')
    idGenre: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;

    const data: RemoveFromFavouritesInput = {
      id: idGenre,
      type: 'bands',
    };
    return this.favouritesService.remove(data, token);
  }
}
