import { prisma } from '../config/prisma';
import { Prisma } from '../../generated/prisma/client';

export class ProfileRepository {
  async updateProfile(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export const profileRepository = new ProfileRepository();
