import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { OrderDto } from '../dtos';
import { JwtAuthGuard } from '@shop/guards';
import { OrderCreate, OrderGet } from '@shop/contracts';

@Controller('order')
export class OrderController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(@Body() dto: OrderDto) {
    try {
      return this.rmqService.send(OrderCreate.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders() {
    try {
      return this.rmqService.send(OrderGet.topic, '');
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
