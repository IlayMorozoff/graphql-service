import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { TracksService } from '../tracks/tracks.service';
import { GenresService } from '../genres/genres.service';

@Module({
  providers: [
    AlbumsResolver,
    AlbumsService,
    ArtistsService,
    BandsService,
    TracksService,
    GenresService,
  ],
})
export class AlbumsModule {}
