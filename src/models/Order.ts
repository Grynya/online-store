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
    Region: string;

    @Column()
    City: string;

    @Column()
    Street: string;

    @Column()
    NumOfBuild: string;


    constructor(user: User, orderItem: OrderItem[], Region: string, City: string, Street: string, NumOfBuild: string) {
        this.user = user;
        this.orderItems = orderItem;
        this.Region = Region;
        this.City = City;
        this.Street = Street;
        this.NumOfBuild = NumOfBuild;
    }
}
