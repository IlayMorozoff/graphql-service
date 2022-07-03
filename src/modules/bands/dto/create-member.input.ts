import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field({ nullable: true })
  artist?: string;

  @Field({ nullable: true })
  instrument?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  years?: string[];
}
