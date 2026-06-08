import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { CustomError } from '../utils/custom-error';
import { Role } from '../../generated/prisma/client';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new CustomError(401, 'Unauthorized: Missing or invalid token'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new CustomError(401, 'Unauthorized: Token is missing'));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = { id: payload.id, role: payload.role as Role };
    next();
  } catch (error) {
    console.error('JWT Verification error:', error);
    return next(new CustomError(401, 'Unauthorized: Token expired or invalid'));
  }
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new CustomError(401, 'Unauthorized: No user session'));
  }
  
  if (req.user.role !== 'ADMIN') {
    return next(new CustomError(403, 'Forbidden: Admin access required'));
  }

  next();
};
