import { Injectable } from '@nestjs/common';
import { Product } from '../models/products';

@Injectable()
export class BudsService {
  async findAllBuds() {
    const buds = await Product.findAll();
    return buds;
  }
}
