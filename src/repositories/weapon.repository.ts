import { prisma } from '../config/prisma';
import { Prisma, WeaponType } from '../../generated/prisma/client';

export class WeaponRepository {
  async findAll(params: { page: number; limit: number; type?: WeaponType; search?: string }) {
    const { page, limit, type, search } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.WeaponWhereInput = {};

    if (type) {
      where.type = type;
    }

    if (search) {
      where.name = {
        contains: search,
      };
    }

    const [data, total] = await Promise.all([
      prisma.weapon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.weapon.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: number) {
    return prisma.weapon.findUnique({
      where: { id },
    });
  }

  // Admin methods
  async create(data: Prisma.WeaponCreateInput) {
    return prisma.weapon.create({ data });
  }

  async update(id: number, data: Prisma.WeaponUpdateInput) {
    return prisma.weapon.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.weapon.delete({
      where: { id },
    });
  }
}

export const weaponRepository = new WeaponRepository();
