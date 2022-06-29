import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../models/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async getAll(): Promise<User[]>  {
        return this.userRepository.find();
    }
    async add(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userRepository.save(user);
    }

    async login(loginRequest) {
        try {
            // @ts-ignore
            const foundUser = await this.userRepository.findOne({where: {
                    email: loginRequest.email
                }});
            if (!foundUser) {
                throw new Error('Name of user is not correct');
            }

            const isMatch = bcrypt.compareSync(loginRequest.password, foundUser.password);

            if (isMatch) {
                const token = jwt.sign({ _id: foundUser.id?.toString(), name: foundUser.name }, process.env.TOKEN_SECRET, {
                    expiresIn: '2 days',
                });

                return { user: { id: foundUser.id, name: foundUser.name }, token: token };
            } else {
                throw new Error('Password is not correct');
            }
        } catch (error) {
            throw error;
        }
    }


}
