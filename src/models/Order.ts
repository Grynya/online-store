import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, OneToMany } from 'typeorm';
import {User} from "./User";
import {OrderItem} from "./OrderItem";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn() private _id: number;

    @ManyToOne(type => User, user => user.orders, { onDelete: 'CASCADE' }) private _user: User;

    @OneToMany(type => OrderItem, orderItem => orderItem.order,{ onDelete: 'CASCADE',
        cascade: ['insert', 'update'] })
    _orderItems: OrderItem[];

    @Column() private _region: string;

    @Column() private _city: string;

    @Column() private _street: string;

    @Column() private _numOfBuild: string;

    constructor() {
    }

    set user(value: User) {
        this._user = value;
    }

    set orderItems(value: OrderItem[]) {
        this._orderItems = value;
    }

    set region(value: string) {
        this._region = value;
    }

    set city(value: string) {
        this._city = value;
    }

    set street(value: string) {
        this._street = value;
    }

    set numOfBuild(value: string) {
        this._numOfBuild = value;
    }

    addOrderItem(orderItem):void{
        this._orderItems.push(orderItem)
    }
}
