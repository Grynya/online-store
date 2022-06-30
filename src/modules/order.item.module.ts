import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {OrderItem} from "../models/OrderItem";

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    exports: [TypeOrmModule],
})
export class OrderItemModule {}
