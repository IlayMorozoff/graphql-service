import { Injectable } from '@nestjs/common';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';

@Injectable()
export class BandsService {
  create(createBandInput: CreateBandInput) {
    return 'This action adds a new band';
  }

  findAll() {
    return `This action returns all bands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} band`;
  }

  update(id: number, updateBandInput: UpdateBandInput) {
    return `This action updates a #${id} band`;
  }

  remove(id: number) {
    return `This action removes a #${id} band`;
  }
}
