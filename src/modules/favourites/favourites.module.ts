import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesResolver } from './favourites.resolver';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { GenresModule } from '../genres/genres.module';
import { BandsModule } from '../bands/bands.module';

@Module({
  imports: [ArtistsModule, TracksModule, GenresModule, BandsModule],
  providers: [FavouritesResolver, FavouritesService],
})
export class FavouritesModule {}
