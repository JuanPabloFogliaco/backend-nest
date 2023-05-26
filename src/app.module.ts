import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './AuthModule/auth.module';
import { User } from './AuthModule/models/user';
import { authMiddleware } from './middlewares/auth.middleware';
import { UserModule } from './UserModule/user.module';
import { BudsModule } from './ProductsModule/products.module';
import { Product } from './ProductsModule/models/products';
import { OrderModule } from './OrdersModule/orders.module';
import { OrderItem } from './OrdersModule/models/orderItems';
import { Order } from './OrdersModule/models/order';

@Module({
  imports: [
    SequelizeModule.forRoot({
      host: '31.220.60.102',
      port: 8090,
      username: 'root',
      password: 'bbe7e84e0a55d7432e720b6635bf784aa443f899b805262d',
      database: 'prueba',
      dialect: 'mariadb',
      synchronize: true,
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([User, Product, OrderItem, Order]),
    AuthModule,
    UserModule,
    OrderModule,
    BudsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'order', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
