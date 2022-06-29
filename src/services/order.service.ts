import {HttpException, HttpStatus, Injectable, UseFilters} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Order} from "../models/Order";
import {OrderItemDto, OrderRequest} from "../controllers/request/OrderRequest";
import {OrderItem} from "../models/OrderItem";
import {Product} from "../models/Product";
import {User} from "../models/User";
import {HttpExceptionFilter} from "../filters/http-exception.filter";

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
        return this.orderRepository.query('select "order_id", "User".name as userName,' +
            ' "Product".name as productName, "Product".price, "Order"._region, "Order"._city, "Order"._street, ' +
            '"Order"."_numOfBuild"\n' +
            'from "Order"\n' +
            '         left join "User" on "Order"."UserId" = "User".id\n' +
            '         left join "OrderItem" on "Order"._id = "OrderItem".order_id\n' +
            '    left join "Product" on "OrderItem"."productId" = "Product".id;')
    }

    async getByUserId(userId: number): Promise<Order[]> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        if (!user) throw new HttpException('No user with such id', HttpStatus.NOT_FOUND);
        return this.orderRepository.query('select "order_id", "Product".name as productName, "Product".price,' +
            ' "Order"._region, ' +
            '"Order"._city, "Order"._street, "Order"."_numOfBuild"\n' +
            'from "Order"\n' +
            '         left join "OrderItem" on "Order"._id = "OrderItem".order_id\n' +
            '    left join "Product" on "OrderItem"."productId" = "Product".id\n' +
            '       where "UserId"='+userId)
    }

    @UseFilters(HttpExceptionFilter)
    async add(orderRequest: OrderRequest): Promise<void> {
        let order: Order = new Order();

        const user = await this.userRepository.findOne({
            where: {
                id: orderRequest.userId
            }
        });
        if (!user) throw new HttpException('No user with such id', HttpStatus.NOT_FOUND);

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

            if (!product) throw new HttpException('No product with such id', HttpStatus.NOT_FOUND);

            let orderItem: OrderItem = new OrderItem(product, order, orderItemDto.quantity);
            order.addOrderItem(orderItem)
            await this.orderItemRepository.save(orderItem);
        }

        await this.orderRepository.save(order);
    }
    update(id: number, newOrder: Order): Promise<any> {
        return this.orderRepository.update(id, newOrder);
    }

    delete(id: number): Promise<any> {
        return this.orderRepository.delete(id);
    }
}
