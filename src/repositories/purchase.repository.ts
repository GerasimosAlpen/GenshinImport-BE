import { pool, withTransaction } from '../config/db';
import { CustomError } from '../utils/custom-error';
import { Purchase, PurchaseItem, Weapon, Artifact } from '../models';

export interface CheckoutItemInput {
  weaponId?: number | null;
  artifactId?: number | null;
  quantity: number;
}

export class PurchaseRepository {
  private async processWeaponItem(conn: any, weaponId: number, quantity: number) {
    const rows = await conn.query('SELECT * FROM Weapon WHERE id = ? FOR UPDATE', [weaponId]);
    if (rows.length === 0) {
      throw new CustomError(404, `Weapon with ID ${weaponId} not found`);
    }
    const weapon = rows[0] as Weapon;

    if (weapon.stock < quantity) {
      throw new CustomError(400, `Insufficient stock for weapon: ${weapon.name}`);
    }

    await conn.query('UPDATE Weapon SET stock = stock - ? WHERE id = ?', [quantity, weaponId]);

    return {
      weaponId,
      quantity,
      unitPrice: Number(weapon.price),
    };
  }

  private async processArtifactItem(conn: any, artifactId: number, quantity: number) {
    const rows = await conn.query('SELECT * FROM Artifact WHERE id = ? FOR UPDATE', [artifactId]);
    if (rows.length === 0) {
      throw new CustomError(404, `Artifact with ID ${artifactId} not found`);
    }
    const artifact = rows[0] as Artifact;

    if (artifact.stock < quantity) {
      throw new CustomError(400, `Insufficient stock for artifact: ${artifact.name}`);
    }

    await conn.query('UPDATE Artifact SET stock = stock - ? WHERE id = ?', [quantity, artifactId]);

    return {
      artifactId,
      quantity,
      unitPrice: Number(artifact.price),
    };
  }

  async checkout(userId: number, itemsInput: CheckoutItemInput[]) {
    return withTransaction(async (conn) => {
      let totalPrice = 0;
      const itemsToCreate: any[] = [];

      for (const item of itemsInput) {
        let processed;
        if (item.weaponId) {
          processed = await this.processWeaponItem(conn, item.weaponId, item.quantity);
        } else if (item.artifactId) {
          processed = await this.processArtifactItem(conn, item.artifactId, item.quantity);
        } else {
          continue;
        }

        itemsToCreate.push(processed);
        totalPrice += processed.unitPrice * item.quantity;
      }

      // Generate a simple unique CUID-like id for purchase since we aren't using Prisma's default
      const purchaseId = 'p_' + Date.now() + Math.random().toString(36).substring(2, 9);

      // Create Purchase
      await conn.query(
        'INSERT INTO Purchase (id, userId, totalPrice, status) VALUES (?, ?, ?, ?)',
        [purchaseId, userId, totalPrice, 'COMPLETED']
      );

      // Create Purchase Items
      for (const item of itemsToCreate) {
        const itemId = 'pi_' + Date.now() + Math.random().toString(36).substring(2, 9);
        await conn.query(
          'INSERT INTO PurchaseItem (id, purchaseId, weaponId, artifactId, quantity, unitPrice) VALUES (?, ?, ?, ?, ?, ?)',
          [itemId, purchaseId, item.weaponId || null, item.artifactId || null, item.quantity, item.unitPrice]
        );
      }

      return this.findByIdAndUserId(purchaseId, userId, conn);
    });
  }

  private async fetchNestedItems(purchaseId: string, connOrPool: any = pool) {
    const items = await connOrPool.query('SELECT * FROM PurchaseItem WHERE purchaseId = ?', [purchaseId]) as PurchaseItem[];
    for (const item of items) {
      if (item.weaponId) {
        const weapons = await connOrPool.query('SELECT * FROM Weapon WHERE id = ?', [item.weaponId]);
        item.weapon = weapons[0] || null;
      }
      if (item.artifactId) {
        const artifacts = await connOrPool.query('SELECT * FROM Artifact WHERE id = ?', [item.artifactId]);
        item.artifact = artifacts[0] || null;
      }
    }
    return items;
  }

  async findByUserId(userId: number) {
    const purchases = await pool.query('SELECT * FROM Purchase WHERE userId = ? ORDER BY createdAt DESC', [userId]) as Purchase[];
    for (const purchase of purchases) {
      purchase.items = await this.fetchNestedItems(purchase.id);
    }
    return purchases;
  }

  async findByIdAndUserId(id: string, userId: number, txConn?: any) {
    const conn = txConn || pool;
    const purchases = await conn.query('SELECT * FROM Purchase WHERE id = ? AND userId = ?', [id, userId]) as Purchase[];
    if (purchases.length === 0) return null;
    
    const purchase = purchases[0];
    if (!purchase) return null;
    purchase.items = await this.fetchNestedItems(purchase.id, conn);
    return purchase;
  }
}

export const purchaseRepository = new PurchaseRepository();
