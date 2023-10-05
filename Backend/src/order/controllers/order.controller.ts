import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderDto } from '../dtos/order.dto';
import { OrderEntity } from '../models/order.entity';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() order: OrderDto) {
        return this.orderService.create(order)

    }

    







}
