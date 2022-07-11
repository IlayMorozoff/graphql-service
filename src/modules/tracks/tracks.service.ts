import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateTrackInput } from './dto/create-track.input';
import { PagingTrackInput } from './dto/paging-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_TRACKS'),
    });
  }

  async create(createTrackInput: CreateTrackInput, token: string) {
    try {
      const headers = {
        authorization: token || '',
      };

      const resp = await this.client.post<
        CreateTrackInput,
        AxiosResponse<Track>
      >(
        '',
        {
          ...createTrackInput,
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

  async findAll(pagingTrackInput?: PagingTrackInput) {
    try {
      const queryParams = pagingTrackInput
        ? `?limit=${pagingTrackInput.limit}&offset=${pagingTrackInput.offset}`
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

  async update(id: string, updateTrackInput: UpdateTrackInput, token: string) {
    try {
      const headers = {
        authorization: token || '',
      };

      const resp = await this.client.put<
        UpdateTrackInput,
        AxiosResponse<Track>
      >(
        `/${id}`,
        {
          ...updateTrackInput,
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
