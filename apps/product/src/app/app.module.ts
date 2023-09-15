import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shop/database';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModel, ProductSchema } from './product.model';
import { getRMQConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/product/src/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: ProductModel.name,
        schema: ProductSchema,
      },
    ]),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
