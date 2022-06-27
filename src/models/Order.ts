import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, OneToMany } from 'typeorm';
import {User} from "./User";
import {OrderItem} from "./OrderItem";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.orders)
    user: User;

    @OneToMany(type => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @Column()
    region: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    numOfBuild: string;


    constructor(user: User, orderItem: OrderItem[], Region: string, City: string, Street: string, NumOfBuild: string) {
        this.user = user;
        this.orderItems = orderItem;
        this.region = Region;
        this.city = City;
        this.street = Street;
        this.numOfBuild = NumOfBuild;
    }
}
