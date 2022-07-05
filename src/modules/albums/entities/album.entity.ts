import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class DeletedAlbum {
  @Field(() => ID, { name: 'id' })
  _id: string;
}

@ObjectType()
export class Album extends DeletedAlbum {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  artistsIds?: string[];

  bandsIds?: string[];

  trackIds?: string[];

  genresIds?: string[];

  @Field({ nullable: true })
  image?: string;
}
