import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_ARTISTS'),
    });
  }

  async create(
    createArtistInput: CreateArtistInput,
    token: string,
  ): Promise<Artist> {
    const headers = {
      authorization: token,
    };

    const resp = await this.client.post<
      CreateArtistInput,
      AxiosResponse<Artist>
    >(
      '',
      {
        ...createArtistInput,
      },
      {
        headers,
      },
    );

    return resp.data;
  }

  findAll() {
    return `This action returns all artists`;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);

    return resp.data;
  }

  update(id: string, updateArtistInput: UpdateArtistInput, token: string) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string, token: string) {
    return `This action removes a #${id} artist`;
  }
}
