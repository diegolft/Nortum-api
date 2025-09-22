import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { CreateUserDto } from '../dto/CreateUserDto';
import { IPasswordService } from '../interfaces/IPasswordService';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(userData: CreateUserDto): Promise<{ id: string; email: string; name: string; username: string }> {
    // Check if user already exists by email
    const existingUserByEmail = await this.userRepository.findByEmail(userData.email);
    if (existingUserByEmail) {
      throw new Error('User already exists with this email');
    }

    // Check if username already exists
    const existingUserByUsername = await this.userRepository.findByUsername(userData.username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordService.hashPassword(userData.password);

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
    };
  }
}
