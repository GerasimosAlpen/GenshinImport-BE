import { z } from 'zod';

export const artifactQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  type: z.enum(['FLOWER', 'PLUME', 'SANDS', 'GOBLET', 'CIRCLET']).optional(),
  search: z.string().optional(),
});
