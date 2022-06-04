import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {ProductModule} from "./product.module";
import {ProductController} from "./controllers/product.controller";
import {ProductService} from "./service/product.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
