import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { AddToFavouritesInput } from './dto/add-to-favourites.input';
import { RemoveFromFavouritesInput } from './dto/remove-from-favourites.input';

@Injectable()
export class FavouritesService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_FAVOURITES'),
    });
  }

  async add(addToFavouritesInput: AddToFavouritesInput, token: string) {
    const headers = {
      authorization: token,
    };

    const resp = await this.client.put(
      '/add',
      {
        ...addToFavouritesInput,
      },
      {
        headers,
      },
    );

    return resp.data;
  }

  async findAll(token: string) {
    const headers = {
      authorization: token,
    };
    const resp = await this.client.get('', { headers });
    return resp.data;
  }

  async remove(
    removeFromFavouritesInput: RemoveFromFavouritesInput,
    token: string,
  ) {
    const headers = {
      authorization: token,
    };

    const resp = await this.client.put(
      '/remove',
      {
        ...removeFromFavouritesInput,
      },
      {
        headers,
      },
    );

    return resp.data;
  }
}
