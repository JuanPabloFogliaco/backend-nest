import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItems';
import { Product } from 'src/ProductsModule/models/products';

@Injectable()
export class OrdersService {
  async insertOrderBuds(datos: IInsertOrderBuds) {
    const { order, userEmail } = datos;
    try {
      //Busco al usuario
      const user = await User.findOne({ where: { email: userEmail } });
      if (!user)
        throw new HttpException('No existe el usuario', HttpStatus.NOT_FOUND);

      //Genero orden para el usuario
      const orderCreate = await Order.create({
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
      });
      if (!orderCreate)
        throw new HttpException(
          'No se pudo crear la orden',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      //Genero los items de la orden
      //Tengo order que es un array de objetos, name y count por cada producto agregado a la orden
      for (const e of order) {
        // Busco el producto por name
        const product = await Product.findOne({ where: { name: e.name } });
        if (!product) {
          throw new HttpException(
            'No existe el producto',
            HttpStatus.NOT_FOUND,
          );
        }

        //Reviso si hay stock para la cantidad de productos que el usuario pide
        console.log(e.count);
        console.log(product.stock);
        if (e.count > product.stock)
          throw new HttpException(
            'No hay stock disponible para el producto ' + product.name + '.',
            HttpStatus.NOT_FOUND,
          );

        //Si hay stock descuento
        product.stock = product.stock - e.count;
        await product.save();

        // Creo el item de la orden
        await OrderItem.create({
          orderId: orderCreate.id,
          quantity: e.count,
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: product.id,
        });
      }
      return 'Orden creada con exito.';
    } catch (error) {
      throw error;
    }
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
