import { IsEmail, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.contact';

  export class Dto {
    @IsEmail()
    @IsString()
    login: string;

    @IsString()
    password: string;
  }
}
