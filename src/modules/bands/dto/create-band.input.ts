import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateMemberInput } from './create-member.input';

@InputType()
export class CreateBandInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [CreateMemberInput], { nullable: 'itemsAndList' })
  members?: CreateMemberInput[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
