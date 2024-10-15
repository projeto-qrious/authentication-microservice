import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitmqConfig } from '../rabbitmq.options';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, rabbitmqConfig);
  await app.listen();
}
bootstrap();
