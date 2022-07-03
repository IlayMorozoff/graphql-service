import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  year?: number;
}
