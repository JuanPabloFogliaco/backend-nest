import { Injectable } from '@nestjs/common';
import { User } from '../models/user';

@Injectable()
export class UserService {
  async userProfile(email: string) {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }
}
