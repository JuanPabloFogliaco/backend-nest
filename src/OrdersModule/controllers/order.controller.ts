import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('/')
  async InsertOrderBuds(@Body() datos: IInsertOrderBuds) {
    return await this.orderService.insertOrderBuds(datos);
  }
}

interface IInsertOrderBuds {
  userEmail: string;
  order: Array<IOrderBuds>;
}

interface IOrderBuds {
  name: string;
  count: number;
}
