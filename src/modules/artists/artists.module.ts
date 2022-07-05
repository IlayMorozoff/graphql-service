import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';
import { BandsService } from '../bands/bands.service';

@Module({
  providers: [ArtistsResolver, ArtistsService, BandsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
