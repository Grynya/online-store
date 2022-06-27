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

    async add(product: Order): Promise<void> {
        await this.orderRepository.save(product);
    }

    async getAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async delete(id: string): Promise<void> {
        await this.orderRepository.delete(id);
    }
}
