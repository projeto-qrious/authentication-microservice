import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitmqConfig = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'auth_queue',
    queueOptions: {
      durable: true,
    },
    socketOptions: {
      heartbeat: 60,
    },
  },
} as RmqOptions;
