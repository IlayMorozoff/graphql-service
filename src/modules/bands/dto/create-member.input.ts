import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => ID, { name: 'id' })
  id?: string;

  @Field({ nullable: true })
  instrument?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  years?: string[];
}
