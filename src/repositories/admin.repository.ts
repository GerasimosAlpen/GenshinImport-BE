import { prisma } from '../config/prisma';

export class AdminRepository {
  async getDashboardStats() {
    const [totalUsers, totalWeapons, totalArtifacts, totalPurchases, totalRevenueRaw] = await Promise.all([
      prisma.user.count(),
      prisma.weapon.count(),
      prisma.artifact.count(),
      prisma.purchase.count(),
      prisma.purchase.aggregate({
        _sum: {
          totalPrice: true,
        },
      }),
    ]);

    const totalRevenue = totalRevenueRaw._sum.totalPrice ? Number(totalRevenueRaw._sum.totalPrice) : 0;

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
