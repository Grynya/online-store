import {
    Controller,
    Delete,
    Get,
    Post,
    Param,
    Body, Put,
} from '@nestjs/common';
import {OrderService} from "../services/order.service";
import {Order} from "../models/Order";
import {OrderRequest} from "./request/OrderRequest";

@Controller('auth/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    /**
     * An endpoint to get all orders
     */
    @Get()
    getAll(): Promise<Order[]> {
        return this.orderService.getAll();
    }
    /**
     * An endpoint to create a new order
     */
    @Post()
    add(@Body() orderRequest: OrderRequest): Promise<void> {
        return this.orderService.add(orderRequest);
    }
    /**
     * An endpoint to update an order
     */
    @Put(':id')
    put(@Param('id') id: string, @Body() newOrder: Order): Promise<void> {
        return this.orderService.update(id, newOrder);
    }
    /**
     * An endpoint to delete order
     */
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.orderService.delete(id);
    }
}
