import { WeaponType } from '../models';

export type WeaponQueryInput = {
  page: number;
  limit: number;
  type?: WeaponType | undefined;
  search?: string | undefined;
};
