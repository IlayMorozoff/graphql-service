import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  albumId?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
