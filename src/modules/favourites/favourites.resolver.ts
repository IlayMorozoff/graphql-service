import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Request } from 'express';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';
import { AddToFavouritesInput } from './dto/add-to-favourites.input';
import { RemoveFromFavouritesInput } from './dto/remove-from-favourites.input';
import { Band } from '../bands/entities/band.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { BandsService } from '../bands/bands.service';
import { TracksService } from '../tracks/tracks.service';
import { GenresService } from '../genres/genres.service';
import { ArtistsService } from '../artists/artists.service';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly bandsService: BandsService,
    private readonly tracksService: TracksService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

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

  @ResolveField('bands', () => [Band], { nullable: 'itemsAndList' })
  async getBands(@Parent() favourite: Favourite) {
    const { bandsIds } = favourite;

    return Promise.all(bandsIds.map((id) => this.bandsService.findOne(id)));
  }

  @ResolveField('genres', () => [Genre], { nullable: 'itemsAndList' })
  async getGenres(@Parent() favourite: Favourite) {
    const { genresIds } = favourite;
    return Promise.all(genresIds.map((id) => this.genresService.findOne(id)));
  }

  @ResolveField('tracks', () => [Track], { nullable: 'itemsAndList' })
  async getAlbums(@Parent() favourite: Favourite) {
    const { tracksIds } = favourite;
    return Promise.all(tracksIds.map((id) => this.tracksService.findOne(id)));
  }

  @ResolveField('artists', () => [Artist], { nullable: 'itemsAndList' })
  async getArtists(@Parent() favourite: Favourite) {
    const { artistsIds } = favourite;
    return Promise.all(artistsIds.map((id) => this.artistsService.findOne(id)));
  }
}
