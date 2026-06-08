import { prisma } from '../config/prisma';
import { Prisma } from '../../generated/prisma/client';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByGoogleId(googleId: string) {
    return prisma.user.findUnique({
      where: { googleId },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async findUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}

export const authRepository = new AuthRepository();
