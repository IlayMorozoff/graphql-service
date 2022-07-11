import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateArtistInput } from './dto/create-artist.input';
import { PagingArtistInput } from './dto/paging-artist.input';
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
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(pagingArtistInput?: PagingArtistInput): Promise<Artist[]> {
    try {
      const queryParams = pagingArtistInput
        ? `?limit=${pagingArtistInput.limit}&offset=${pagingArtistInput.offset}`
        : '';

      const resp = await this.client.get(queryParams);

      return resp.data.items;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string): Promise<Artist> {
    const resp = await this.client.get(`/${id}`);

    return resp.data;
  }

  async update(
    id: string,
    updateArtistInput: UpdateArtistInput,
    token: string,
  ): Promise<Artist> {
    try {
      const headers = {
        authorization: token,
      };

      const resp = await this.client.put(
        `${id}`,
        {
          ...updateArtistInput,
        },
        {
          headers,
        },
      );
      return resp.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string, token: string) {
    try {
      const headers = {
        authorization: token,
      };
      const resp = await this.client.delete(`/${id}`, {
        headers,
      });

      if (resp.data.acknowledged && resp.data.deletedCount === 1) {
        return { _id: id };
      }
      return resp;
    } catch (error) {
      console.log(error.message);
    }
  }
}
