import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    // console.log('craete is called');
    const user = this.repo.create({ email, password });
    await this.repo.save(user);
    return user;
  }
  async findOne(id: number) {
    if (!id) return null;
    const user = await this.repo.findOneBy({ id });
    return user;
  }
  async find(email: string) {
    // console.log('find is called');
    const user = await this.repo.find({ where: { email } });
    // if (!user) {
    //   throw new NotFoundException('User Does Not Exist');
    // }
    return user;
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Does Not Exist');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Does Not Exist');
    }
    return await this.repo.remove(user);
  }
}
