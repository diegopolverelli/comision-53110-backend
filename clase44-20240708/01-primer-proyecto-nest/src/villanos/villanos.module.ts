import { Module } from '@nestjs/common';
import { VillanosService } from './villanos.service';
import { VillanosController } from './villanos.controller';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports:[HeroesModule],
  controllers: [VillanosController],
  providers: [VillanosService],
})
export class VillanosModule {}
