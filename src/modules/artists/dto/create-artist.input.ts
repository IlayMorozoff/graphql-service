import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
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

  @Field(() => String)
  country: string;

  @Field(() => [ID], { nullable: true })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: true })
  instruments?: string[];
}
