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
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule
  ],
  controllers: [ProductController, MessageController],
  providers: [ProductService, QueueSenderService, QueueReceiverService],
})
export class AppModule {}
