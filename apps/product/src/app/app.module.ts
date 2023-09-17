import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shop/database';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/product/src/.env',
    }),
    DatabaseModule,
    RMQModule.forRootAsync(getRMQConfig()),
  ],
})
export class AppModule {}
