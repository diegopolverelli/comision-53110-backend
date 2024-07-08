import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { PruebaMiddleware } from './middlewares/MiddlewarePrueba';

// const nombre = 'JUAN';
// console.log(nombre)

dotenv.config({path:"./src/.env", override:true})

const connDB=async()=>{
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
        {
            dbName: process.env.DB_NAME
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
connDB()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT

  app.use(PruebaMiddleware)

  await app.listen(PORT, ()=>{
    // console.log(`Server online en puerto 3000...!!!`)
    Logger.verbose(`Server corriendo en puerto ${PORT}`, "Proyecto Nest")
  });
}
bootstrap();
