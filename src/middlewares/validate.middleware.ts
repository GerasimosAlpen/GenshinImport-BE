import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateRequest = (schema: ZodType<any, any, any>, source: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req[source]);
      Object.keys(req[source]).forEach((key) => delete req[source][key]);
      Object.assign(req[source], parsed);
      next();
    } catch (error) {
      next(error);
    }
  };
};
