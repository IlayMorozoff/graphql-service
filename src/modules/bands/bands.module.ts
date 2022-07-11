import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import { GenresService } from '../genres/genres.service';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [ArtistsModule],
  providers: [BandsResolver, BandsService, GenresService],
  exports: [BandsService],
})
export class BandsModule {}
