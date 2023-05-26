import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiUrl = process.env.NEST_PUBLIC_API_URL_FRONT_DEV;
  await app.use(cors({ origin: apiUrl }));
  await app.listen(8080);
}
bootstrap();
