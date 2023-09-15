import { IsString } from 'class-validator';

export namespace CartCreate {
  export const topic = 'cart.create';

  export class Dto {
    @IsString()
    userId: string;

    @IsString()
    productId: string;
  }
}
