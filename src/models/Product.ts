import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//test
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

  constructor(name: string, price: number, desc: string) {
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

  set isBought(value: boolean) {
    this._isBought = value;
  }
}
