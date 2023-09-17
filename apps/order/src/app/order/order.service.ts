import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderCreate } from '@shop/contracts';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel.name)
    private readonly orderModel: Model<OrderModel>
  ) {}

  async createOrder(dto: OrderCreate.Dto) {
    return this.orderModel.create(dto);
  }

  async getOrders() {
    return this.orderModel.find({});
  }
}
