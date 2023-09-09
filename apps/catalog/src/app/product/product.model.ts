import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct } from '@shop/interfaces';
import { Document } from 'mongoose';

@Schema()
export class ProductModel extends Document implements IProduct {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
