import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  birthDate?: string;

  @Field({ nullable: true })
  birthPlace?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  instruments?: string[];
}
