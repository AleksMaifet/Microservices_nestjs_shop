import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { AccountLogin, AccountRegister } from '@shop/contracts';
import { IUser } from '@shop/interfaces';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shop/database';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from './auth.module';

const registerDto: AccountRegister.Dto = {
  login: 'a@a.ru',
  password: '1',
};

const loginDto: AccountLogin.Dto = {
  login: 'a@a.ru',
  password: '1',
};

describe('AuthController', () => {
  let app: INestApplication;
  let rmqService: RMQTestService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './apps/auth/src/.env',
        }),
        DatabaseModule,
        RMQModule.forTest({}),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    rmqService = app.get(RMQService);
    userService = app.get(UserService);
    await app.init();
  });

  it('Register - success', async () => {
    const res = await rmqService.triggerRoute<unknown, IUser>(
      AccountRegister.topic,
      registerDto
    );
    expect(201);
    expect(res.email).toEqual(registerDto.login);
  });

  it('Login - success', async () => {
    const res = await rmqService.triggerRoute<
      unknown,
      { access_token: string }
    >(AccountLogin.topic, loginDto);
    expect(200);
    expect(res.access_token).toBeDefined();
  });

  afterAll(async () => {
    await userService.deleteUser(loginDto.login);
    await app.close();
  });
});
