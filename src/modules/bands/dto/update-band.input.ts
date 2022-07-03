import { CreateBandInput } from './create-band.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBandInput extends PartialType(CreateBandInput) {
  @Field(() => ID, { name: 'id' })
  _id: string;
}
