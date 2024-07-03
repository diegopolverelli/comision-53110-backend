import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VillanosService } from './villanos.service';
import { CreateVillanoDto } from './dto/create-villano.dto';
import { UpdateVillanoDto } from './dto/update-villano.dto';

@Controller('villanos')
export class VillanosController {
  constructor(private readonly villanosService: VillanosService) {}

  @Post()
  create(@Body() createVillanoDto: CreateVillanoDto) {
    return this.villanosService.create(createVillanoDto);
  }

  @Get()
  findAll() {
    return this.villanosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villanosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVillanoDto: UpdateVillanoDto) {
    return this.villanosService.update(+id, updateVillanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villanosService.remove(+id);
  }
}
