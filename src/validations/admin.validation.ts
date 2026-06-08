import { z, ZodType } from 'zod';
import {
  CreateWeaponInput,
  UpdateWeaponInput,
  CreateArtifactInput,
  UpdateArtifactInput,
} from '../types/admin.types';

const baseWeaponFields = {
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['SWORD', 'CLAYMORE', 'POLEARM', 'CATALYST', 'BOW']),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  imageUrl: z.string().url({ message: 'Invalid image URL format' }),
  price: z.number().positive('Price must be positive'),
};

export const createWeaponSchema: ZodType<CreateWeaponInput> = z.object(baseWeaponFields);

export const updateWeaponSchema: ZodType<UpdateWeaponInput> = z.object(baseWeaponFields).partial();

const baseArtifactFields = {
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['FLOWER', 'PLUME', 'SANDS', 'GOBLET', 'CIRCLET']),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  imageUrl: z.string().url({ message: 'Invalid image URL format' }),
  price: z.number().positive('Price must be positive'),
};

export const createArtifactSchema: ZodType<CreateArtifactInput> = z.object(baseArtifactFields);

export const updateArtifactSchema: ZodType<UpdateArtifactInput> = z.object(baseArtifactFields).partial();
