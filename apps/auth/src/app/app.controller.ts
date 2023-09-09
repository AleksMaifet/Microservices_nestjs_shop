import { BadRequestException, Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountLogin, AccountRegister } from '@shop/contracts';
import { UserService } from './user/user.service';
import { ALREADY_REGISTERED_ERROR } from './user/user.constants';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AppService
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
