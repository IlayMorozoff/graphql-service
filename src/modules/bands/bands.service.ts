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
  }

  async findAll(pagingBandInput?: PagingBandInput) {
    const queryParams = pagingBandInput
      ? `?limit=${pagingBandInput.limit}&offset=${pagingBandInput.offset}`
      : '';

    const resp = await this.client.get(queryParams);

    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);

    return resp.data;
  }

  async update(id: string, updateBandInput: UpdateBandInput, token: string) {
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
