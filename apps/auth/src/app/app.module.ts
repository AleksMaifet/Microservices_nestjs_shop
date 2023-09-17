import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { DatabaseModule } from '@shop/database';
import { getRMQConfig } from './configs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/src/.env',
    }),
    DatabaseModule,
    RMQModule.forRootAsync(getRMQConfig()),
    AuthModule,
  ],
})
export class AppModule {}
