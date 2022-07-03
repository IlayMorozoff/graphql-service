import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { PagingGenreInput } from './dto/paging-genre.input';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  createGenre(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.genresService.create(createGenreInput, token);
  }

  @Query(() => [Genre], { name: 'genres', nullable: 'itemsAndList' })
  findAll(
    @Args('pagingGenreInput', { nullable: true })
    pagingGenreInput?: PagingGenreInput,
  ) {
    return this.genresService.findAll(pagingGenreInput);
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  updateGenre(
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.genresService.update(
      updateGenreInput._id,
      updateGenreInput,
      token,
    );
  }

  @Mutation(() => Genre)
  deleteGenre(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: Request,
  ) {
    const token = req.headers.authorization;
    return this.genresService.remove(id, token);
  }
}
