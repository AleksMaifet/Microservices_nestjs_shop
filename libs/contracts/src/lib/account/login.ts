import { IsEmail, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.contact';

  export class Dto {
    @IsEmail()
    @IsString()
    login: string;

    @IsString()
    password: string;
  }
}
