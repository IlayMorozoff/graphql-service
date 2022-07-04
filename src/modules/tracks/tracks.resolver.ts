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
import { TracksService } from './tracks.service';
import { DeletedTrack, Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { PagingTrackInput } from './dto/paging-track.input';
import { Band } from '../bands/entities/band.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Album } from '../albums/entities/album.entity';
import { AlbumsService } from '../albums/albums.service';
import { Artist } from '../artists/entities/artist.entity';
import { ArtistsService } from '../artists/artists.service';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation(() => Track)
  createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.create(createTrackInput, token);
  }

  @Query(() => [Track], { name: 'tracks', nullable: 'itemsAndList' })
  findAll(
    @Args('pagingTrackInput', { nullable: true })
    pagingTrackInput?: PagingTrackInput,
  ) {
    return this.tracksService.findAll(pagingTrackInput);
  }

  @Query(() => Track, { name: 'track' })
  findOne(@Args('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Mutation(() => Track)
  updateTrack(
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.update(
      updateTrackInput._id,
      updateTrackInput,
      token,
    );
  }

  @Mutation(() => DeletedTrack)
  deleteTrack(@Args('id') id: string, @Context('req') req: Request) {
    const token = req.headers.authorization;
    return this.tracksService.remove(id, token);
  }

  @ResolveField('bands', () => [Band], { nullable: 'itemsAndList' })
  async getBands(@Parent() track: Track) {
    const { bandsIds } = track;

    return Promise.all(bandsIds.map((id) => this.bandsService.findOne(id)));
  }

  @ResolveField('genres', () => [Genre], { nullable: 'itemsAndList' })
  async getGenres(@Parent() track: Track) {
    const { genresIds } = track;
    return Promise.all(genresIds.map((id) => this.genresService.findOne(id)));
  }

  @ResolveField('albums', () => [Album], { nullable: 'itemsAndList' })
  async getAlbums(@Parent() track: Track) {
    const { albumId } = track;
    return Promise.all([this.albumsService.findOne(albumId)]);
  }

  @ResolveField('artists', () => [Artist], { nullable: 'itemsAndList' })
  async getArtists(@Parent() track: Track) {
    const { artistsIds } = track;
    return Promise.all(artistsIds.map((id) => this.artistsService.findOne(id)));
  }
}
