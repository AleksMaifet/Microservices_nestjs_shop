import { IsString } from 'class-validator';

export namespace CartCreate {
  export const topic = 'product.create';

  export class Dto {
    @IsString()
    userId: string;

    @IsString()
    productId: string;
  }
}
