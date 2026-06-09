import { pool } from '../config/db';

export class AdminRepository {
  async getDashboardStats() {
    const [[usersRes], [weaponsRes], [artifactsRes], [purchasesRes], [revenueRes]] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM User'),
      pool.query('SELECT COUNT(*) as count FROM Weapon'),
      pool.query('SELECT COUNT(*) as count FROM Artifact'),
      pool.query('SELECT COUNT(*) as count FROM Purchase'),
      pool.query('SELECT SUM(totalPrice) as total FROM Purchase'),
    ]);

    const totalUsers = Number(usersRes[0].count);
    const totalWeapons = Number(weaponsRes[0].count);
    const totalArtifacts = Number(artifactsRes[0].count);
    const totalPurchases = Number(purchasesRes[0].count);
    const totalRevenue = revenueRes[0].total ? Number(revenueRes[0].total) : 0;

    return {
      totalUsers,
      totalWeapons,
      totalArtifacts,
      totalPurchases,
      totalRevenue,
    };
  }
}

export const adminRepository = new AdminRepository();
