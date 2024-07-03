import { Module } from '@nestjs/common';
import { VillanosService } from './villanos.service';
import { VillanosController } from './villanos.controller';

@Module({
  controllers: [VillanosController],
  providers: [VillanosService],
})
export class VillanosModule {}
