import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitmqConfig } from '../rabbitmq.options';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  // Cria o aplicativo HTTP
  const app = await NestFactory.create(AppModule);

  // Conecta o microserviço RabbitMQ
  app.connectMicroservice(rabbitmqConfig);

  // Inicia o microserviço
  await app.startAllMicroservices();

  // Faz o aplicativo HTTP escutar na porta especificada ou na porta padrão 3000
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
