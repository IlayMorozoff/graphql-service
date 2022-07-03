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
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { PagingArtistInput } from './dto/paging-artist.input';
import { Band } from '../bands/entities/band.entity';
import { BandsService } from '../bands/bands.service';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
  ) {}

  @Query(() => [Artist], { name: 'artists', nullable: 'itemsAndList' })
  findAll(
    @Args('pagingArtistInput', { nullable: true })
    pagingArtistInput?: PagingArtistInput,
  ) {
    return this.artistsService.findAll(pagingArtistInput);
  }

  @Query(() => Artist, { name: 'artist' })
  findOne(@Args('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Mutation(() => Artist)
  createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.artistsService.create(createArtistInput, token);
  }

  @Mutation(() => Artist)
  updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.artistsService.update(
      updateArtistInput._id,
      updateArtistInput,
      token,
    );
  }

  @Mutation(() => Artist)
  deleteArtist(@Args('id') id: string, @Context('req') req: Request) {
    const token = req.headers.authorization;
    return this.artistsService.remove(id, token);
  }

  @ResolveField('bands', () => [Band], { nullable: 'itemsAndList' })
  async getBands(@Parent() artist: Artist) {
    const { bandsIds } = artist;

    return Promise.all(bandsIds.map((id) => this.bandsService.findOne(id)));
  }
}
