import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get('URL_USERS'),
    });
  }

  async create(registerUserInput: RegisterUserInput): Promise<User> {
    const resp = await this.client.post<RegisterUserInput, AxiosResponse<User>>(
      '/register',
      {
        ...registerUserInput,
      },
    );

    return resp.data;
  }

  findAll() {
    // return this.users;
  }

  async findOne(id: string): Promise<User> {
    const resp = await this.client.get<unknown, AxiosResponse<User>>(`/${id}`);
    return resp.data;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    // const index = this.users.findIndex((item) => item.id === id);

    // this.users[index] = updateUserInput;
    return updateUserInput;
  }

  remove(id: number) {
    // this.users = this.users.filter((item) => item.id !== id);
    return `This action removes a #${id} user`;
  }
}
