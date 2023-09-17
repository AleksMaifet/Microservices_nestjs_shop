import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartCreate } from '@shop/contracts';
import { CartModel } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel.name)
    private readonly cartModel: Model<CartModel>
  ) {}

  async create(dto: CartCreate.Dto) {
    return await this.cartModel.create(dto);
  }

  async findById(id: string) {
    return await this.cartModel.find({ userId: id }).exec();
  }

  async deleteById(id: string) {
    return this.cartModel.findByIdAndDelete(id).exec();
  }
}
