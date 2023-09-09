import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.catalog.env',
    }),
    RMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRMQConfig,
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
