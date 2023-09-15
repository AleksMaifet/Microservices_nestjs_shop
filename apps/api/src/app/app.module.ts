import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs';
import { AuthController } from './controllers/auth.controller';
import { CartController } from './controllers/cart.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { JwtStrategy } from '@shop/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/src/.env',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [
    AuthController,
    CartController,
    OrderController,
    ProductController,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
