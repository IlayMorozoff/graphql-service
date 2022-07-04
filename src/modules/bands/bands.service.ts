import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateBandInput } from './dto/create-band.input';
import { PagingBandInput } from './dto/paging-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';

@Injectable()
export class BandsService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_BANDS'),
    });
  }

  async create(createBandInput: CreateBandInput, token: string) {
    try {
      const headers = {
        authorization: token,
      };

      const resp = await this.client.post<CreateBandInput, AxiosResponse<Band>>(
        '',
        {
          ...createBandInput,
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

  async findAll(pagingBandInput?: PagingBandInput) {
    try {
      const queryParams = pagingBandInput
        ? `?limit=${pagingBandInput.limit}&offset=${pagingBandInput.offset}`
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

  async update(id: string, updateBandInput: UpdateBandInput, token: string) {
    try {
      const headers = {
        authorization: token,
      };

      const resp = await this.client.put<UpdateBandInput, AxiosResponse<Band>>(
        `/${id}`,
        {
          ...updateBandInput,
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
