import { z, ZodType } from 'zod';
import { ArtifactQueryInput } from '../types/artifact.types';

export const artifactQuerySchema: ZodType<ArtifactQueryInput> = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  type: z.enum(['FLOWER', 'PLUME', 'SANDS', 'GOBLET', 'CIRCLET']).optional(),
  search: z.string().optional(),
});
