import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Heroe, HeroeSchema } from './schemas/heroesSchema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Heroe.name, schema: HeroeSchema }, ]),
    AuthModule
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
