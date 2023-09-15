import { Body, Controller, NotFoundException } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  ProductCreate,
  ProductDelete,
  ProductGet,
  ProductUpdate,
} from '@shop/contracts';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly productService: AppService) {}

  @RMQValidate()
  @RMQRoute(ProductCreate.topic)
  async create(@Body() dto: ProductCreate.Dto) {
    return this.productService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(ProductGet.topic)
  async get(@Body() id: string) {
    const product = await this.productService.findById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @RMQValidate()
  @RMQRoute(ProductDelete.topic)
  async delete(@Body() id: string) {
    const deletedProduct = await this.productService.deleteById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @RMQValidate()
  @RMQRoute(ProductUpdate.topic)
  async patch(@Body() { id, dto }: { id: string; dto: ProductUpdate.Dto }) {
    const updatedProduct = await this.productService.updateById(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return updatedProduct;
  }
}
