import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  trackIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];

  @Field({ nullable: true })
  image?: string;
}
