import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderModel, OrderSchema } from './order.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderModel.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
