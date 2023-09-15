import { IsNumber, IsString } from 'class-validator';

export namespace ProductCreate {
  export const topic = 'product.create';

  export class Dto {
    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;
  }
}
