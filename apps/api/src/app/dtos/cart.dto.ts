import { IsString } from 'class-validator';

export class CartDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}
