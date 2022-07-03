import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class DeletedAlbum {
  @Field(() => ID)
  _id: string;
}

@ObjectType()
export class Album extends DeletedAlbum {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'tracks' })
  trackIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];

  @Field({ nullable: true })
  image?: string;
}
