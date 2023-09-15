import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICart } from '@shop/interfaces';

@Schema()
export class CartModel extends Document implements ICart {
  @Prop({ required: true })
  productId: string;
  @Prop({ required: true })
  userId: string;
}

export const CartSchema = SchemaFactory.createForClass(CartModel);
