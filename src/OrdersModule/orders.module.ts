/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './controllers/order.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './models/order';
import { User } from './models/user';
import { OrderItem } from './models/orderItems';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, User, OrderItem]),
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [OrderController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrderModule {}
