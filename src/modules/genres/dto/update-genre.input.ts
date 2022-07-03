import { CreateGenreInput } from './create-genre.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput extends PartialType(CreateGenreInput) {
  @Field(() => ID, { name: 'id' })
  _id: string;
}
