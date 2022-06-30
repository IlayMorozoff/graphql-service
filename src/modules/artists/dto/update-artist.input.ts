import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateArtistInput } from './create-artist.input';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @Field(() => ID)
  _id: string;
}
