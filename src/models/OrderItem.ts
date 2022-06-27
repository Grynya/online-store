import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Product} from "./Product";
import {Order} from "./Order";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, product => product.orderItems, {
        cascade: true,
    })
    product: Product;

    @ManyToOne(type => Order, order => order.orderItems, {
        cascade: true,
    })
    order: Order;

    @Column()
    quantity: number;

    constructor(product: Product, order: Order, quantity: number) {
        this.product = product;
        this.order = order;
        this.quantity = quantity;
    }
}
