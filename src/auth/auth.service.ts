import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './jwtConstants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; expiresIn: string }> {
    const user: User = await this.usersService.findOneByCriteria({ username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      expiresIn: jwtConstants.expiresIn,
    };
  }
}
