import { Injectable } from '@nestjs/common';
import { CreateVillanoDto } from './dto/create-villano.dto';
import { UpdateVillanoDto } from './dto/update-villano.dto';

@Injectable()
export class VillanosService {
  create(createVillanoDto: CreateVillanoDto) {
    return 'This action adds a new villano';
  }

  findAll() {
    return `This action returns all villanos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} villano`;
  }

  update(id: number, updateVillanoDto: UpdateVillanoDto) {
    return `This action updates a #${id} villano`;
  }

  remove(id: number) {
    return `This action removes a #${id} villano`;
  }
}
