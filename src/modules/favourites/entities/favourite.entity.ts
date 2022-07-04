import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Favourite {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [ID])
  bandsIds: string[];

  @Field(() => [ID])
  genresIds: string[];

  @Field(() => [ID])
  artistsIds: string[];

  @Field(() => [ID])
  tracksIds: string[];
}
