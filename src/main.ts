import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitmqConfig } from '../rabbitmq.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, rabbitmqConfig);
  await app.listen();
}
bootstrap();
