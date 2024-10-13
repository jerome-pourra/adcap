import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Request() request: Request): User {
    return request['user'] as User;
  }

  @Post('create')
  async create(@Body() request: UserCreateDto): Promise<Partial<User>> {
    return await this.usersService.create(request.username, request.password);
  }
}
