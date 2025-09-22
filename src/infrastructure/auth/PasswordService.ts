import bcrypt from 'bcryptjs';
import { IPasswordService } from '../../application/interfaces/IPasswordService';

export class PasswordService implements IPasswordService {
  private static readonly SALT_ROUNDS = 12;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, PasswordService.SALT_ROUNDS);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
