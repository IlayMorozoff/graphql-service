import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { BandsModule } from './modules/bands/bands.module';
import { GenresModule } from './modules/genres/genres.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: false,
      context: ({ req }) => {
        return { request: req };
      },
    }),
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    TracksModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
