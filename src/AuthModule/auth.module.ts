/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './controllers/auth.controller';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: "process.env.JWT_SECRET",
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
