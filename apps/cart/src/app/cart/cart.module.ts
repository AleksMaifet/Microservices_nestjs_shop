import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModel, CartSchema } from './cart.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartModel.name,
        schema: CartSchema,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
