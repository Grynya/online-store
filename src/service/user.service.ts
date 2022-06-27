import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/Product';
import {User} from "../models/User";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Product)
        private userRepository: Repository<User>,
    ) {}

    async add(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    // login(login, password) {
    //     return Promise.resolve(undefined);
    // }
}
