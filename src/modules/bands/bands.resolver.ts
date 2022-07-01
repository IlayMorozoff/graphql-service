import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { Band } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';

@Resolver(() => Band)
export class BandsResolver {
  constructor(private readonly bandsService: BandsService) {}

  @Mutation(() => Band)
  createBand(@Args('createBandInput') createBandInput: CreateBandInput) {
    return this.bandsService.create(createBandInput);
  }

  @Query(() => [Band], { name: 'bands' })
  findAll() {
    return this.bandsService.findAll();
  }

  @Query(() => Band, { name: 'band' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  updateBand(@Args('updateBandInput') updateBandInput: UpdateBandInput) {
    return this.bandsService.update(updateBandInput.id, updateBandInput);
  }

  @Mutation(() => Band)
  removeBand(@Args('id', { type: () => Int }) id: number) {
    return this.bandsService.remove(id);
  }
}
