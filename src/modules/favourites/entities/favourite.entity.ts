import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Favourite {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => ID, { nullable: true })
  userId: string;

  bandsIds: string[];

  genresIds: string[];

  artistsIds: string[];

  tracksIds: string[];
}
