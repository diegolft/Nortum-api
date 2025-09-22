import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { CreateUserDto } from '../../application/dto/CreateUserDto';
import { LoginDto } from '../../application/dto/LoginDto';
import { DIContainer } from '../../infrastructure/config/DIContainer';

export class AuthController {
  private createUserUseCase: CreateUserUseCase;
  private loginUseCase: LoginUseCase;

  constructor() {
    const container = DIContainer.getInstance();
    this.createUserUseCase = new CreateUserUseCase(
      container.getUserRepository(),
      container.getPasswordService()
    );
    this.loginUseCase = new LoginUseCase(
      container.getUserRepository(),
      container.getPasswordService(),
      container.getJwtService()
    );
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = new CreateUserDto(req.body);
      const user = await this.createUserUseCase.execute(userData);
      res.status(201).json({ 
        message: 'User created successfully', 
        user 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData = new LoginDto(req.body);
      const result = await this.loginUseCase.execute(loginData);
      res.status(200).json({ 
        message: 'Login successful', 
        ...result 
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
