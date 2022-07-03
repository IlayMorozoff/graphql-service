import { CreateTrackInput } from './create-track.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {
  @Field(() => ID)
  _id: string;
}
