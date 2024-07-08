import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import * as mongoose from 'mongoose';

const heroesModelo=mongoose.model("heroes", new mongoose.Schema(
  {
    name:String, alias:String
  }
))

@Injectable()
export class HeroesService {
  private readonly heroes=[]
  create(createHeroDto: CreateHeroDto) {
    // return 'This action adds a new hero';
    let id=1
    if(this.heroes.length>0){
      id=Math.max(...this.heroes.map(d=>d.id))+1
    }
    
    let nuevoHeroe={
      id, ...createHeroDto
    }

    this.heroes.push(nuevoHeroe)
    return nuevoHeroe
  }

  findAll() {
    // return `This action returns all heroes`;
    // return this.heroes
    return heroesModelo.find().lean()
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
