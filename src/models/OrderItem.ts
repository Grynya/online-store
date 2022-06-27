import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Product} from "./Product";
import {Order} from "./Order";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, product => product.orderItems)
    product: Product;

    @ManyToOne(type => Order, order => order.orderItems)
    order: Order;

    @Column()
    quantity: number;
}
