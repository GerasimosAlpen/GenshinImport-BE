import { prisma } from '../config/prisma';
import { CustomError } from '../utils/custom-error';

export interface CheckoutItemInput {
  weaponId?: number | null;
  artifactId?: number | null;
  quantity: number;
}

export class PurchaseRepository {
  private async processWeaponItem(tx: any, weaponId: number, quantity: number) {
    const weapon = await tx.weapon.findUnique({
      where: { id: weaponId },
    });

    if (!weapon) {
      throw new CustomError(404, `Weapon with ID ${weaponId} not found`);
    }

    if (weapon.stock < quantity) {
      throw new CustomError(400, `Insufficient stock for weapon: ${weapon.name}`);
    }

    await tx.weapon.update({
      where: { id: weaponId },
      data: { stock: weapon.stock - quantity },
    });

    return {
      weaponId,
      quantity,
      unitPrice: Number(weapon.price),
    };
  }

  private async processArtifactItem(tx: any, artifactId: number, quantity: number) {
    const artifact = await tx.artifact.findUnique({
      where: { id: artifactId },
    });

    if (!artifact) {
      throw new CustomError(404, `Artifact with ID ${artifactId} not found`);
    }

    if (artifact.stock < quantity) {
      throw new CustomError(400, `Insufficient stock for artifact: ${artifact.name}`);
    }

    await tx.artifact.update({
      where: { id: artifactId },
      data: { stock: artifact.stock - quantity },
    });

    return {
      artifactId,
      quantity,
      unitPrice: Number(artifact.price),
    };
  }

  async checkout(userId: number, itemsInput: CheckoutItemInput[]) {
    return prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const itemsToCreate: any[] = [];

      for (const item of itemsInput) {
        let processed;
        if (item.weaponId) {
          processed = await this.processWeaponItem(tx, item.weaponId, item.quantity);
        } else if (item.artifactId) {
          processed = await this.processArtifactItem(tx, item.artifactId, item.quantity);
        } else {
          continue;
        }

        itemsToCreate.push(processed);
        totalPrice += processed.unitPrice * item.quantity;
      }

      // Create Purchase
      const purchase = await tx.purchase.create({
        data: {
          userId,
          totalPrice,
          status: 'COMPLETED',
          items: {
            create: itemsToCreate.map(it => ({
              weaponId: it.weaponId || null,
              artifactId: it.artifactId || null,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
            })),
          },
        },
        include: {
          items: {
            include: {
              weapon: true,
              artifact: true,
            },
          },
        },
      });

      return purchase;
    });
  }

  async findByUserId(userId: number) {
    return prisma.purchase.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            weapon: true,
            artifact: true,
          },
        },
      },
    });
  }

  async findByIdAndUserId(id: string, userId: number) {
    return prisma.purchase.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            weapon: true,
            artifact: true,
          },
        },
      },
    });
  }
}

export const purchaseRepository = new PurchaseRepository();
