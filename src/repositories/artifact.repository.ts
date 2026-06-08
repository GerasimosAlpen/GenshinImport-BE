import { prisma } from '../config/prisma';
import { Prisma, ArtifactType } from '../../generated/prisma/client';

export class ArtifactRepository {
  async findAll(params: { page: number; limit: number; type?: ArtifactType; search?: string }) {
    const { page, limit, type, search } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ArtifactWhereInput = {};

    if (type) {
      where.type = type;
    }

    if (search) {
      where.name = {
        contains: search,
      };
    }

    const [data, total] = await Promise.all([
      prisma.artifact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.artifact.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: number) {
    return prisma.artifact.findUnique({
      where: { id },
    });
  }

  // Admin methods
  async create(data: Prisma.ArtifactCreateInput) {
    return prisma.artifact.create({ data });
  }

  async update(id: number, data: Prisma.ArtifactUpdateInput) {
    return prisma.artifact.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.artifact.delete({
      where: { id },
    });
  }
}

export const artifactRepository = new ArtifactRepository();
