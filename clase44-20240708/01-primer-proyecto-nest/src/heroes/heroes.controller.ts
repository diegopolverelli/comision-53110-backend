import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ValidationPipe } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('api/heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body(new ValidationPipe({whitelist:true, forbidNonWhitelisted: true})) createHeroDto: CreateHeroDto) {
    // let {name}=createHeroDto
    // if(!name){
    //   throw new BadRequestException("El name es requerido...!!")
    // }
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(+id);
  }
}
