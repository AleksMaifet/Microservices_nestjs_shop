import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRMQConfig = () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
      connections: [
        {
          login: configService.get('AMQP_LOGIN') ?? '',
          password: configService.get('AMQP_PASSWORD') ?? '',
          host: configService.get('AMQP_HOST') ?? '',
        },
      ],
      queueName: configService.get('AMQP_QUEUE'),
      prefetchCount: 32,
      serviceName: 'catalog',
    }),
  };
};
