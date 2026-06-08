import { z } from 'zod';

export const weaponQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  type: z.enum(['SWORD', 'CLAYMORE', 'POLEARM', 'CATALYST', 'BOW']).optional(),
  search: z.string().optional(),
});
