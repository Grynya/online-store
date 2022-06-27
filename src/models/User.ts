import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Order} from "./Order";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}
