import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { Jwt } from './entities/jwt.entity';
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
    try {
      const resp = await this.client.post<
        RegisterUserInput,
        AxiosResponse<User>
      >('/register', {
        ...registerUserInput,
      });
      return resp.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const resp = await this.client.get<unknown, AxiosResponse<User>>(
        `/${id}`,
      );
      return resp.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<Jwt> {
    try {
      const resp = await this.client.post<LoginUserInput, AxiosResponse<Jwt>>(
        '/login',
        {
          ...loginUserInput,
        },
      );
      return resp.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
