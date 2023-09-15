import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CartCreate, CartDelete, CartGet } from '@shop/contracts';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly cartService: AppService) {}

  @RMQValidate()
  @RMQRoute(CartCreate.topic)
  async create(@Body() dto: CartCreate.Dto) {
    return this.cartService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(CartGet.topic)
  async get(@Body() id: string) {
    const cart = await this.cartService.findById(id);

    if (!cart) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  @RMQValidate()
  @RMQRoute(CartDelete.topic)
  async delete(@Body() id: string) {
    const deletedCart = await this.cartService.deleteById(id);

    if (!deletedCart) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }
  }
}
