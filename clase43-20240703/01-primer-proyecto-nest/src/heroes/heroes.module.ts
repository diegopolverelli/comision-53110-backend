import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports:[],  // otros módulos (clases decoradas con @Module)
  controllers: [HeroesController],
  providers: [HeroesService],  // servicios o providers (clases decoradas con @Injectable)
  exports: []
})
export class HeroesModule {}
