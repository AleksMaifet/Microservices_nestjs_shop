import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shop/database';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/cart/src/.env',
    }),
    DatabaseModule,
    RMQModule.forRootAsync(getRMQConfig()),
  ],
})
export class AppModule {}
