import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PruebaMiddleware } from './middlewares/PruebaMiddleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/.env', ignoreEnvVars:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {dbName:process.env.DB_NAME}),
    HeroesModule, 
    UsuariosModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  constructor(){
    Logger.debug(process.env.DB_NAME, "AppModule")
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PruebaMiddleware)
      .forRoutes({ path: '/api/heroes', method: RequestMethod.ALL });
  }
}


