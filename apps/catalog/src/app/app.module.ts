import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RMQModule } from 'nestjs-rmq';
import { JwtStrategy } from '@shop/strategies';
import { getJWTConfig, getMongoConfig, getRMQConfig } from './product/configs';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.catalog.env',
    }),
    RMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRMQConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ProductModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
