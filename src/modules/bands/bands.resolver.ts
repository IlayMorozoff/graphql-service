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
import { BandsService } from './bands.service';
import { Band, DeletedBand } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { PagingBandInput } from './dto/paging-band.input';
import { Genre } from '../genres/entities/genre.entity';
import { GenresService } from '../genres/genres.service';
import { ArtistsService } from '../artists/artists.service';
import { Member } from './entities/member.entity';

@Resolver(() => Band)
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation(() => Band)
  createBand(
    @Args('createBandInput') createBandInput: CreateBandInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.bandsService.create(createBandInput, token);
  }

  @Query(() => [Band], { name: 'bands', nullable: 'itemsAndList' })
  findAll(
    @Args('pagingBandInput', { nullable: true })
    pagingBandInput?: PagingBandInput,
  ) {
    return this.bandsService.findAll(pagingBandInput);
  }

  @Query(() => Band, { name: 'band' })
  findOne(@Args('id') id: string) {
    return this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  updateBand(
    @Args('updateBandInput') updateBandInput: UpdateBandInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.bandsService.update(
      updateBandInput._id,
      updateBandInput,
      token,
    );
  }

  @Mutation(() => DeletedBand)
  deleteBand(@Args('id') id: string, @Context('req') req: Request) {
    const token = req.headers.authorization;
    return this.bandsService.remove(id, token);
  }

  @ResolveField('genres', () => [Genre], { nullable: 'itemsAndList' })
  async getGenresIds(@Parent() band: Band) {
    const { genresIds } = band;

    return Promise.all(genresIds.map((id) => this.genresService.findOne(id)));
  }

  @ResolveField('members', () => [Member], { nullable: 'itemsAndList' })
  async getMembers(@Parent() band: Band) {
    const { members } = band;

    return (
      await Promise.all(
        members.map((member) => this.artistsService.findOne(member.id)),
      )
    ).map((artist, index) => ({
      ...artist,
      instrument: members[index].instrument,
      years: members[index].years,
    }));
  }
}
