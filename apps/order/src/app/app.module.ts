import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@shop/database';
import { RMQModule } from 'nestjs-rmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModel, OrderSchema } from './order.model';
import { getRMQConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/order/src/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: OrderModel.name,
        schema: OrderSchema,
      },
    ]),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
