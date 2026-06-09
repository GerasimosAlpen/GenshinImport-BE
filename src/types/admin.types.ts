import { WeaponType, ArtifactType } from '../models';

export type CreateWeaponInput = {
  name: string;
  type: WeaponType;
  description: string;
  stock: number;
  imageUrl: string;
  price: number;
};

export type UpdateWeaponInput = {
  name?: string | undefined;
  type?: WeaponType | undefined;
  description?: string | undefined;
  stock?: number | undefined;
  imageUrl?: string | undefined;
  price?: number | undefined;
};

export type CreateArtifactInput = {
  name: string;
  type: ArtifactType;
  description: string;
  stock: number;
  imageUrl: string;
  price: number;
};

export type UpdateArtifactInput = {
  name?: string | undefined;
  type?: ArtifactType | undefined;
  description?: string | undefined;
  stock?: number | undefined;
  imageUrl?: string | undefined;
  price?: number | undefined;
};
