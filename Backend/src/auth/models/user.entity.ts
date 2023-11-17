
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
}
