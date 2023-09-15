import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { DatabaseModule } from '@shop/database';
import { getJWTConfig, getRMQConfig } from './configs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/src/.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    DatabaseModule,
    RMQModule.forRootAsync(getRMQConfig()),
    AuthModule,
  ],
})
export class AppModule {}
