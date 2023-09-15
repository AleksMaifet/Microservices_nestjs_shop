import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CartGet, OrderCreate } from '@shop/contracts';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly orderService: AppService) {}

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
