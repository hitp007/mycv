import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('email Already Exist');
    }
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = hash.toString('hex') + '.' + salt;
    return await this.userService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException('email Does Not Exist');
    }
    const [hash, salt] = user.password.split('.');

    const hashnew = (await scrypt(password, salt, 32)) as Buffer;
    if (hashnew.toString('hex') !== hash) {
      throw new NotFoundException('Wrong Password');
    }
    return user;
  }
}
