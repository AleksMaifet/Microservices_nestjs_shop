import { BadRequestException, Body, Controller } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@shop/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from '../user/user.constants';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(@Body() dto: AccountRegister.Dto) {
    const oldUser = await this.userService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    } else {
      return this.userService.createUser(dto);
    }
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(@Body() { login, password }: AccountLogin.Dto) {
    const { email } = await this.userService.validateUser(login, password);

    return this.authService.login(email);
  }
}
