import {MiddlewareConsumer, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {ProductModule} from "./modules/product.module";
import {ProductController} from "./controllers/product.controller";
import {ProductService} from "./services/product.service";
import {MessageController} from "./controllers/message.controller";
import {QueueSenderService} from "./services/queue.sender.service";
import {QueueReceiverService} from "./services/queue.receiver.service";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {OrderController} from "./controllers/order.controller";
import {UserController} from "./controllers/user.controller";
import {OrderService} from "./services/order.service";
import {UserService} from "./services/user.service";
import {UserModule} from "./modules/user.module";
import {OrderModule} from "./modules/order.module";
import {OrderItemModule} from "./modules/order.item.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule, UserModule, OrderModule, OrderItemModule
  ],
  controllers: [ProductController, MessageController, OrderController, UserController],
  providers: [ProductService, QueueSenderService, QueueReceiverService, OrderService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("/auth")
  }
}
