import { CreateAlbumInput } from './create-album.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  @Field(() => ID)
  _id: string;
}
