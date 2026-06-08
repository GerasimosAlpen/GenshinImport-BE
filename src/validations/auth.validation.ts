import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8),
});

export const oauthSchema = z.object({
  googleId: z.string().min(1),
  email: z.string().email({ message: 'Invalid email format' }),
  username: z.string().min(3),
});
