import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Model } from 'mongoose';
import { Heroe } from './schemas/heroesSchema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HeroesService {
  constructor(@InjectModel(Heroe.name) private heroesModelo: Model<Heroe>) {}

  create(createHeroDto: CreateHeroDto) {
    return 'This action adds a new hero';
  }

  findAll() {
    // return `This action returns all heroes`;
    return this.heroesModelo.find().lean()
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    return `This action updates a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
