import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const response = { accessToken: '', error: '' };
    const { username, email, password } = registerDto;
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      throw new NotFoundException(
        'User not found',
        'El usuario que esta intentando registrar ya existe, pruebe con otro email y usuario. Gracias!',
      );
    } else {
      const user = await User.create({
        username,
        email,
        password,
      });

      const payload = { username, sub: user.id };

      response.accessToken = this.jwtService.sign(payload);
      return response;
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; error: string }> {
    const user = await User.findOne({ where: { email } });
    const response = { accessToken: '', error: '' };

    if (!user) {
      throw new NotFoundException(
        'User not found',
        'El usuario no existe.Porfavor escriba otro email, gracias :)',
      );
    }

    const aux = await this.generatePasswordHash(user.password);

    const hashedInputPassword = await new Promise<string>((resolve, reject) => {
      pbkdf2(password, aux.salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      });
    });

    if (hashedInputPassword !== aux.hashedPassword) {
      throw new UnauthorizedException(
        'Invalid credentials',
        'Contraseña incorrecta',
      );
    }

    const payload = { sub: user.id };
    response.accessToken = this.jwtService.sign(payload);

    return response;
  }

  private async generatePasswordHash(
    password: string,
  ): Promise<{ salt: string; hashedPassword: string }> {
    const salt = randomBytes(16).toString('hex');

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      });
    });

    return { salt, hashedPassword };
  }
}
