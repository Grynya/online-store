import {
    Controller,
    Post,
    Body, Get,
} from '@nestjs/common';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {LoginRequest} from "./request/LoginRequest";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}
    /**
     * An endpoint to get all users
     */
    @Get("/auth/users")
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }
    /**
     * An endpoint that allows you to make login into system
     */
    @Post("/login")
    login(@Body() loginRequest: LoginRequest): Promise<{ user: { name: string; id: number }; token: any }> {
        return this.userService.login(loginRequest);
    }

    /**
     * An endpoint that allow to create a new account
     */
    @Post("/registrar")
    registration(@Body() user: User): Promise<User> {
        return this.userService.add(user);
    }
}
//test