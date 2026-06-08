import { ArtifactType } from '../../generated/prisma/client';

export type ArtifactQueryInput = {
  page: number;
  limit: number;
  type?: ArtifactType | undefined;
  search?: string | undefined;
};
