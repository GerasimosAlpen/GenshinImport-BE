import { z, ZodType } from 'zod';
import { RegisterInput, LoginInput, OAuthInput } from '../types/auth.types';

export const registerSchema: ZodType<RegisterInput> = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8).optional(),
});

export const loginSchema: ZodType<LoginInput> = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8).optional(),
});

export const oauthSchema: ZodType<OAuthInput> = z.object({
  googleId: z.string().min(1),
  email: z.string().email({ message: 'Invalid email format' }),
  username: z.string().min(3),
});
