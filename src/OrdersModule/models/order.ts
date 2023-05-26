import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/AuthModule/models/user';
import { OrderItem } from './orderItems';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => OrderItem, 'orderId')
  orderItems: OrderItem[];
}
