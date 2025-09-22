import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { LoginDto } from '../dto/LoginDto';
import { IPasswordService } from '../interfaces/IPasswordService';
import { IJwtService } from '../interfaces/IJwtService';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private jwtService: IJwtService
  ) {}

  async execute(loginData: LoginDto): Promise<{ token: string; user: { id: number; email: string; fullName: string; username: string } }> {
    // Find user by username
    const user = await this.userRepository.findByUsername(loginData.username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await this.passwordService.comparePassword(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
      },
    };
  }
}
