import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT=process.env.PORT
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.verbose(`App corriendo en puerto ${PORT}`)
}
bootstrap();
