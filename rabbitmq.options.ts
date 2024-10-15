import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitmqConfig = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@rabbitmq-3-management-xk33.onrender.com:5672'],
    queue: 'auth_queue',
    queueOptions: {
      durable: true,
    },
  },
} as RmqOptions;
