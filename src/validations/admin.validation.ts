import { z } from 'zod';

export const createWeaponSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['SWORD', 'CLAYMORE', 'POLEARM', 'CATALYST', 'BOW']),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  imageUrl: z.string().url({ message: 'Invalid image URL format' }),
  price: z.number().positive('Price must be positive'),
});

export const updateWeaponSchema = createWeaponSchema.partial();

export const createArtifactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['FLOWER', 'PLUME', 'SANDS', 'GOBLET', 'CIRCLET']),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  imageUrl: z.string().url({ message: 'Invalid image URL format' }),
  price: z.number().positive('Price must be positive'),
});

export const updateArtifactSchema = createArtifactSchema.partial();
