// user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength,IsOptional,IsEnum } from 'class-validator';
import { UserRole } from '../models/user.entity';
export class CreateUserDto {

  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional() // Make the 'role' property optional
  @IsEnum(UserRole)
  role?: UserRole;
}
