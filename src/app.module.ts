import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {ProductModule} from "./product.module";
import {ProductController} from "./controllers/product.controller";
import {ProductService} from "./service/product.service";
import {MessageController} from "./controllers/message.controller";
import {QueueSenderService} from "./service/queue.sender.service";
import {QueueReceiverService} from "./service/queue.receiver.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: "localhost://user:password@postgres:5432/db",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule
  ],
  controllers: [ProductController, MessageController],
  providers: [ProductService, QueueSenderService, QueueReceiverService],
})
export class AppModule {}
