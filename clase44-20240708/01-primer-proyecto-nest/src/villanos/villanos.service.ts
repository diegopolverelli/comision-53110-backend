import { Injectable } from '@nestjs/common';
import { CreateVillanoDto } from './dto/create-villano.dto';
import { UpdateVillanoDto } from './dto/update-villano.dto';
import { HeroesService } from '../heroes/heroes.service';

@Injectable()
export class VillanosService {

  private readonly villanos=[
    {
      id:1, name:"Joker"
    }
  ]
  constructor(private readonly heroesService: HeroesService) {}

  create(createVillanoDto: CreateVillanoDto) {
    return 'This action adds a new villano';
  }

  findAll() {
    let heroes=this.heroesService.findAll()
    // return `This action returns all villanos`;
    return {
      heroes, 
      villanos:this.villanos
    }
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
