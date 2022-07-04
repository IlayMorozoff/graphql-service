import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RemoveFromFavouritesInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: 'bands' | 'genres' | 'artist' | 'tracks';
}
