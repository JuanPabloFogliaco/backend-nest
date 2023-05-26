import { Controller, Get } from '@nestjs/common';
import { BudsService } from '../services/products.service';

@Controller('buds')
export class BudsController {
  constructor(private readonly budsService: BudsService) {}

  @Get('/')
  async FindAllBuds() {
    return this.budsService.findAllBuds();
  }
}
