import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
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

  @Field()
  country: string;

  @Field(() => [ID], { nullable: true })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: true })
  instruments?: string[];
}
