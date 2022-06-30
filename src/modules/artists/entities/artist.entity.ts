import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => String, { nullable: true })
  birthPlace?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: true })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: true })
  instruments?: string[];
}
