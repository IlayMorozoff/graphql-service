import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Genre {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  year?: number;
}
