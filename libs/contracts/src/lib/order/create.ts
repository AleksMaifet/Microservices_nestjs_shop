import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export namespace OrderCreate {
  export const topic = 'order.create';

  export class Dto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    price: number;

    @IsPhoneNumber()
    phoneNumber: string;
  }
}
