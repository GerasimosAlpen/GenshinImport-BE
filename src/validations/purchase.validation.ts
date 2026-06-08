import { z, ZodType } from 'zod';
import { CheckoutInput } from '../types/purchase.types';

export const checkoutSchema: ZodType<CheckoutInput> = z.object({
  items: z.array(
    z.object({
      weaponId: z.number().int().positive().optional().nullable(),
      artifactId: z.number().int().positive().optional().nullable(),
      quantity: z.number().int().positive('Quantity must be at least 1'),
    }).refine(data => {
      const hasWeapon = data.weaponId !== undefined && data.weaponId !== null;
      const hasArtifact = data.artifactId !== undefined && data.artifactId !== null;
      return (hasWeapon && !hasArtifact) || (!hasWeapon && hasArtifact);
    }, {
      message: 'Each item must specify either weaponId or artifactId, but not both',
    })
  ).min(1, 'At least one item is required to checkout'),
});
