import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { CreateUserDto } from '../dto/CreateUserDto';
import { IPasswordService } from '../interfaces/IPasswordService';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(userData: CreateUserDto): Promise<{ id: string; email: string; name: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await this.passwordService.hashPassword(userData.password);

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
