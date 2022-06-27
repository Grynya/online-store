import {
    Controller,
    Post,
    Body, Param,
} from '@nestjs/common';
import {User} from "../models/User";
import {UserService} from "../service/user.service";

@Controller('products')
export class ProductController {
    constructor(private readonly userService: UserService) {}

    // /**
    //  * An endpoint that allows you to make login into system
    //  */
    // @Post("/login")
    // login(@Param() login: string, @Param() password: string): Promise<void> {
    //     return this.userService.login(login, password);
    // }

    /**
     * An endpoint that allow to create a new account
     */
    @Post()
    registration(@Body() user: User): Promise<void> {
        return this.userService.add(user);
    }
}
