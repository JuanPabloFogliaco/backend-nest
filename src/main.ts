import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.use(cors({ origin: 'http://localhost:3000' }));
  await app.listen(8080);
}
bootstrap();
