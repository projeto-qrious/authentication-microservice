import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitmqConfig } from '../rabbitmq.options';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  // microserviço RabbitMQ
  const app = await NestFactory.createMicroservice(AppModule, rabbitmqConfig);
  await app.listen();

  // Adicione um servidor HTTP básico apenas para o Render
  const httpApp = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await httpApp.listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
  });
}
bootstrap();
