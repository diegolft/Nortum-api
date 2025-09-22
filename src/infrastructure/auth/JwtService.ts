import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { IJwtService, TokenPayload } from '../../application/interfaces/IJwtService';

export class JwtService implements IJwtService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret as jwt.Secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwt.secret as jwt.Secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static extractTokenFromHeader(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }
    return authHeader.substring(7);
  }
}
