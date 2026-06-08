import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided to update",
});
