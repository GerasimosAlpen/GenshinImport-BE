import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateRequest = (schema: ZodType<any, any, any>, source: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      next(error);
    }
  };
};
