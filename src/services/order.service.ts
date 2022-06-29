import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Order} from "../models/Order";
import {OrderItemDto, OrderRequest} from "../controllers/request/OrderRequest";
import {OrderItem} from "../models/OrderItem";
import {Product} from "../models/Product";
import {User} from "../models/User";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }
    getAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async add(orderRequest: OrderRequest): Promise<void> {
        let order: Order = new Order();

        const user = await this.userRepository.findOne({
            where: {
                id: orderRequest.userId
            }
        });
        if (!user) {
            throw new Error('Id of user is not correct');
        }
        order.user = user;
        order.region = orderRequest.address.region;
        order.city = orderRequest.address.city;
        order.street = orderRequest.address.street;
        order.numOfBuild = orderRequest.address.numOfBuild;
        order.orderItems = [];
// @ts-ignore
        for (let orderItemDto: OrderItemDto of orderRequest.products) {
            const product = await this.productRepository.findOne({
                where: {
                    id: orderItemDto.productId
                }
            });
            if (!product) {
                throw new Error('Id of product is not correct');
            }
            let orderItem: OrderItem = new OrderItem(product, order, orderItemDto.quantity);
            order.addOrderItem(orderItem)
            await this.orderItemRepository.save(orderItem);
        }

        await this.orderRepository.save(order);
    }
    update(id: string, newOrder: Order): Promise<any> {
        return this.orderRepository.update(id, newOrder);
    }

    delete(id: string): Promise<any> {
        return this.orderRepository.delete(id);
    }
}
