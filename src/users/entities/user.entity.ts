import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRoleEnum } from '../enums/user-roles.enum';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRoleEnum.USER, type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;
}
