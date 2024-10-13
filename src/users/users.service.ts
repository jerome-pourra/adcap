import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { appConstants } from 'src/appConstants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  private async isUnique(username: string): Promise<boolean> {
    return !(await this.findOneByCriteria({
      username
    }));
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findByCriteria(criteria: Partial<User>): Promise<User[]> {
    return await this.repository.findBy({ ...criteria });
  }

  async findOneByCriteria(criteria: Partial<User>): Promise<User> {
    return await this.repository.findOneBy({ ...criteria });
  }

  async create(username: string, password: string): Promise<User> {
    if (!(await this.isUnique(username))) {
      throw new BadRequestException(`Username '${username}' is already taken`);
    }

    try {
      const hash = await bcrypt.hash(
        password,
        appConstants.password.saltRounds,
      );
      const user = new User();
      user.username = username;
      user.password = hash;
      return await this.repository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
