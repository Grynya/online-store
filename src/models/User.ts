import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Order} from "./Order";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()  _name: string;

    @Column()  _email: string;

    @Column()  _password: string;

    @OneToMany(type => Order, order => order.user)  orders: Order[];

    constructor(name: string, email: string, password: string) {
        this._name = name;
        this._email = email;
        this._password = password;
    }


    set name(value: string) {
        this._name = value;
    }

    set email(value: string) {
        this._email = value;
    }
    set password(value: string) {
        this._password = value;
    }

}
