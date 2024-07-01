import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const nombre = 'JUAN';
console.log(nombre)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
