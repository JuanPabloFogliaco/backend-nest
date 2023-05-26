import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async UserProfile(@Query('email') email: string) {
    return this.userService.userProfile(email);
  }
}
