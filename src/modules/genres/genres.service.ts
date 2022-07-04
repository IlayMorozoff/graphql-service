import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateGenreInput } from './dto/create-genre.input';
import { PagingGenreInput } from './dto/paging-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_GENRES'),
    });
  }

  async create(createGenreInput: CreateGenreInput, token: string) {
    try {
      const headers = {
        authorization: token || '',
      };

      const resp = await this.client.post<
        CreateGenreInput,
        AxiosResponse<Genre>
      >(
        '',
        {
          ...createGenreInput,
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

  async findAll(pagingGenreInput?: PagingGenreInput) {
    try {
      const queryParams = pagingGenreInput
        ? `?limit=${pagingGenreInput.limit}&offset=${pagingGenreInput.offset}`
        : '';

      const resp = await this.client.get(queryParams);

      return resp.data.items;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const resp = await this.client.get(`/${id}`);

      return resp.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateGenreInput: UpdateGenreInput, token: string) {
    try {
      const headers = {
        authorization: token || '',
      };

      const resp = await this.client.put<
        UpdateGenreInput,
        AxiosResponse<Genre>
      >(
        `/${id}`,
        {
          ...updateGenreInput,
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
        authorization: token || '',
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
