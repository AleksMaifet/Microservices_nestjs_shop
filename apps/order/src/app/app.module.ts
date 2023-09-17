import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shop/database';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/order/src/.env',
    }),
    DatabaseModule,
    RMQModule.forRootAsync(getRMQConfig()),
  ],
})
export class AppModule {}
