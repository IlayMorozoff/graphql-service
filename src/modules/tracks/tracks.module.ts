import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  providers: [
    TracksResolver,
    TracksService,
    BandsService,
    GenresService,
    AlbumsService,
    ArtistsService,
  ],
  exports: [TracksService],
})
export class TracksModule {}
