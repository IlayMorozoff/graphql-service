import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PagingArtistInput {
  @Field(() => Int, { nullable: true })
  limit = 5;

  @Field(() => Int, { nullable: true })
  offset = 0;
}
