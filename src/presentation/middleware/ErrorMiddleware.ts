import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { config } from '../../infrastructure/config/environment';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Log error in development
  if (config.nodeEnv === 'development') {
    console.error(error);
  }

  res.status(statusCode).json({
    error: message,
    ...(config.nodeEnv === 'development' && { stack: error.stack }),
  });
};
