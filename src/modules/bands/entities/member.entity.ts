import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => String, { nullable: true })
  artist?: string;

  @Field(() => String, { nullable: true })
  instrument?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  years?: string[];
}
