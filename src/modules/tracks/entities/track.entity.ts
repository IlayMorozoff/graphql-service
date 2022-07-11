import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class DeletedTrack {
  @Field(() => ID, { name: 'id' })
  _id: string;
}

@ObjectType()
export class Track extends DeletedTrack {
  @Field()
  title: string;

  albumId?: string;

  bandsIds?: string[];

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int, { nullable: true })
  released?: number;

  genresIds?: string[];

  artistsIds?: string[];
}
