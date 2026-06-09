import { ArtifactType } from '../models';

export type ArtifactQueryInput = {
  page: number;
  limit: number;
  type?: ArtifactType | undefined;
  search?: string | undefined;
};
