import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {OrderItem} from "./OrderItem";

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column('boolean', { default: false }) private _isBought: boolean;

  @OneToMany(type => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

  constructor(name: string, price: number, desc: string) {
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

}
