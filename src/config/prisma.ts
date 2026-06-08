import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from './env';
import { PrismaClient } from '../../generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in env configuration');
  }
  const adapter = new PrismaMariaDb(env.DATABASE_URL);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
