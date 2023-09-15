import { IsNumber, IsString } from 'class-validator';

export namespace ProductUpdate {
  export const topic = 'product.update';

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
