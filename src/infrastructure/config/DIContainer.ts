import { IUserRepository } from '../../application/interfaces/IUserRepository';
import { IPasswordService } from '../../application/interfaces/IPasswordService';
import { IJwtService } from '../../application/interfaces/IJwtService';
import { UserRepository } from '../database/repositories/UserRepository';
import { PasswordService } from '../auth/PasswordService';
import { JwtService } from '../auth/JwtService';

export class DIContainer {
  private static instance: DIContainer;
  private userRepository: IUserRepository;
  private passwordService: IPasswordService;
  private jwtService: IJwtService;

  private constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
    this.jwtService = new JwtService();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  getUserRepository(): IUserRepository {
    return this.userRepository;
  }

  getPasswordService(): IPasswordService {
    return this.passwordService;
  }

  getJwtService(): IJwtService {
    return this.jwtService;
  }
}
