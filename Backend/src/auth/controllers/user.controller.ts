import { Body, Controller, NotFoundException, Post, Get, UnauthorizedException, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../models/user.entity';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
      createUserDto.role,
    );
  }

  @Get('allusers')
  async getAllUsers(): Promise<User[]> {
    console.log('Getting all users...');
    return this.userService.getAllUsers();
  }

  @Post('login')
  async login(
    @Body('identifier') identifier: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<void> {
    // Try to find the user by username
    let user = await this.userService.findByUsername(identifier);

    // If not found, try to find the user by email
    if (!user) {
      user = await this.userService.findByEmail(identifier);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return the authentication token and user role
    const token = this.generateAuthToken();
    
    // Include the user role in the response
    res.status(200).json({ access_token: token, role: user.role });
  }

  private generateAuthToken(): string {
    const token = Math.random().toString(36).substr(2); // Generate a random string
    return token;
  }
}
