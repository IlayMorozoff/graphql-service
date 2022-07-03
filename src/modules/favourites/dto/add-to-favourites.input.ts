import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddToFavouritesInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: 'band' | 'genre' | 'artist' | 'track';
}
