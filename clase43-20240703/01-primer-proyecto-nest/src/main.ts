import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// const nombre = 'JUAN';
// console.log(nombre)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=3000
  await app.listen(PORT, ()=>{
    // console.log(`Server online en puerto 3000...!!!`)
    Logger.verbose(`Server corriendo en puerto ${PORT}`, "Proyecto Nest")
  });
}
bootstrap();
