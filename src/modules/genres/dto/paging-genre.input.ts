import { InputType } from '@nestjs/graphql';
import { PagingArtistInput } from 'src/modules/artists/dto/paging-artist.input';

@InputType()
export class PagingGenreInput extends PagingArtistInput {}
