import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { AccountLogin, AccountRegister } from '@shop/contracts';
import { AuthDto } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    try {
      return this.rmqService.send(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    try {
      return this.rmqService.send(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
