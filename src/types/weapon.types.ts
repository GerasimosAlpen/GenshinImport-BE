import { WeaponType } from '../../generated/prisma/client';

export type WeaponQueryInput = {
  page: number;
  limit: number;
  type?: WeaponType | undefined;
  search?: string | undefined;
};
