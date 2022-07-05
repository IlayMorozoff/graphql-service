import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => ID, { name: 'id' })
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  SecondName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  instrument?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  years?: string[];
}
