import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from '@shop/interfaces';
import { Model } from 'mongoose';
import { ProductCreate } from '@shop/contracts';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>
  ) {}

  async create(dto: ProductCreate.Dto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: IProduct) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
