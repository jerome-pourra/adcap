import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvConfigDatabase } from './env-config.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = this.configService.get<EnvConfigDatabase>('database');
    return {
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.user.name,
      password: config.user.password,
      database: config.name,
      entities: [User],
      synchronize: config.synchronize,
    };
  }
}
