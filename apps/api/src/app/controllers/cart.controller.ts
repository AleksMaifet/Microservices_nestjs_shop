import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { CartCreate, CartDelete, CartGet } from '@shop/contracts';
import { JwtAuthGuard } from '@shop/guards';
import { CartDto } from '../dtos';

@Controller('order')
export class CartController {
  constructor(private readonly rmqService: RMQService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CartDto) {
    try {
      return this.rmqService.send(CartCreate.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return this.rmqService.send(CartGet.topic, id);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this.rmqService.send(CartDelete.topic, id);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
