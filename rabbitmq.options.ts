import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitmqConfig = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'auth_queue',
    queueOptions: {
      durable: true,
    },
  },
} as RmqOptions;
