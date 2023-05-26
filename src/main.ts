import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.use(cors({ origin: 'http://31.220.60.102:3000' }));
  await app.listen(8080);
}
bootstrap();
