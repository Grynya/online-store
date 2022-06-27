import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from "../models/Order";
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {
    }

    async add(order: Order): Promise<void> {
        return null;
        // await this.orderRepository.save(order);
    }

    async getAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async delete(id: string): Promise<void> {
        await this.orderRepository.delete(id);
    }
}
