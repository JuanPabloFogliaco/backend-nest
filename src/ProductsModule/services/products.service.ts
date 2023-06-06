import { Injectable } from '@nestjs/common';
import { Product } from '../models/products';

@Injectable()
export class ProductsService {
  async findAllBuds() {
    const buds = await Product.findAll();
    return buds;
  }
}
