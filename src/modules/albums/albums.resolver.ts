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
import { AlbumsService } from './albums.service';
import { Album, DeletedAlbum } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { PagingAlbumInput } from './dto/paging-album.input';
import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { TracksService } from '../tracks/tracks.service';
import { BandsService } from '../bands/bands.service';
import { Genre } from '../genres/entities/genre.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Band } from '../bands/entities/band.entity';
import { Track } from '../tracks/entities/track.entity';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
  ) {}

  @Mutation(() => Album)
  createAlbum(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.albumsService.create(createAlbumInput, token);
  }

  @Query(() => [Album], { name: 'albums', nullable: 'itemsAndList' })
  findAll(
    @Args('pagingGenreInput', { nullable: true })
    pagingAlbumInput?: PagingAlbumInput,
  ) {
    return this.albumsService.findAll(pagingAlbumInput);
  }

  @Query(() => Album, { name: 'album' })
  findOne(@Args('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.albumsService.update(
      updateAlbumInput._id,
      updateAlbumInput,
      token,
    );
  }

  @Mutation(() => DeletedAlbum)
  deleteAlbum(@Args('id') id: string, @Context('req') req: Request) {
    const token = req.headers.authorization;
    return this.albumsService.remove(id, token);
  }

  @ResolveField('genres', () => [Genre], { nullable: 'itemsAndList' })
  async getGenres(@Parent() album: Album) {
    const { genresIds } = album;
    return Promise.all(genresIds.map((id) => this.genresService.findOne(id)));
  }

  @ResolveField('artists', () => [Artist], { nullable: 'itemsAndList' })
  async getArtists(@Parent() album: Album) {
    const { artistsIds } = album;
    return Promise.all(artistsIds.map((id) => this.artistsService.findOne(id)));
  }

  @ResolveField('bands', () => [Band], { nullable: 'itemsAndList' })
  async getBands(@Parent() album: Album) {
    const { bandsIds } = album;
    return Promise.all(bandsIds.map((id) => this.bandsService.findOne(id)));
  }

  @ResolveField('tracks', () => [Track], { nullable: 'itemsAndList' })
  async getTracks(@Parent() album: Album) {
    const { trackIds } = album;
    return Promise.all(trackIds.map((id) => this.tracksService.findOne(id)));
  }
}
