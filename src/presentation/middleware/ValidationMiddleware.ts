import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new dtoClass(req.body);
      req.body = dto;
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.message
      });
    }
  };
};
