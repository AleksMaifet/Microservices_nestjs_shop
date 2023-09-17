import { Body, Controller } from '@nestjs/common';
import { CartGet, OrderCreate } from '@shop/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @RMQValidate()
  @RMQRoute(CartGet.topic)
  async createOrder(@Body() dto: OrderCreate.Dto) {
    return this.orderService.createOrder(dto);
  }

  @RMQValidate()
  @RMQRoute(CartGet.topic)
  async getOrders() {
    return this.orderService.getOrders();
  }
}
