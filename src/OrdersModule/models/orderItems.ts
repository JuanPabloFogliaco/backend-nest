/* eslint-disable prettier/prettier */
import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Order } from './order';
import { Product } from 'src/ProductsModule/models/products';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  quantity: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @BelongsTo(() => Product, 'productId')
  product: Product;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
