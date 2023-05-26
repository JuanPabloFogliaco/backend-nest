/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/products';
import { BudsService } from './services/products.service';
import { BudsController } from './controllers/products.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [BudsController],
  providers: [BudsService],
  exports: [BudsService],
})
export class BudsModule {}
