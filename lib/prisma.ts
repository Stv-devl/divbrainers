import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const extendedPrisma = prisma.$extends({});
