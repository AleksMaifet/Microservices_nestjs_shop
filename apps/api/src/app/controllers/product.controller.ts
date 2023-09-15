import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import {
  ProductCreate,
  ProductDelete,
  ProductGet,
  ProductUpdate,
} from '@shop/contracts';
import { JwtAuthGuard } from '@shop/guards';
import { ProductDto } from '../dtos';

@Controller('product')
export class ProductController {
  constructor(private readonly rmqService: RMQService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: ProductDto) {
    try {
      return this.rmqService.send(ProductCreate.topic, dto);
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
      return this.rmqService.send(ProductGet.topic, id);
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
      return this.rmqService.send(ProductDelete.topic, id);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductDto) {
    try {
      return this.rmqService.send(ProductUpdate.topic, {
        id,
        dto,
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
