import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IOrder } from '@shop/interfaces';

@Schema()
export class OrderModel extends Document implements IOrder {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
