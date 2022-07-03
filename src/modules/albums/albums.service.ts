import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateAlbumInput } from './dto/create-album.input';
import { PagingAlbumInput } from './dto/paging-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_ALBUMS'),
    });
  }

  async create(createAlbumInput: CreateAlbumInput, token: string) {
    const headers = {
      authorization: token,
    };

    const resp = await this.client.post<CreateAlbumInput, AxiosResponse<Album>>(
      '',
      {
        ...createAlbumInput,
      },
      {
        headers,
      },
    );
    return resp.data;
  }

  async findAll(pagingAlbumInput?: PagingAlbumInput) {
    const queryParams = pagingAlbumInput
      ? `?limit=${pagingAlbumInput.limit}&offset=${pagingAlbumInput.offset}`
      : '';

    const resp = await this.client.get(queryParams);

    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);

    return resp.data;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput, token: string) {
    const headers = {
      authorization: token,
    };

    const resp = await this.client.put<UpdateAlbumInput, AxiosResponse<Album>>(
      `/${id}`,
      {
        ...updateAlbumInput,
      },
      {
        headers,
      },
    );
    return resp.data;
  }

  async remove(id: string, token: string) {
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
  }
}
