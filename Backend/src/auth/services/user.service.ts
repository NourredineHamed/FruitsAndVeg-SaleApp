// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { UserRole } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signUp(username: string, email: string, password: string, role?: UserRole): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role || UserRole.User; 
    return await this.userRepository.save(user);
  }
  
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    // Implement your password validation logic here
    // Compare the provided password with the stored password hash
    return user.password === password;
  }
}
