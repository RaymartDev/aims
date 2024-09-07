import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV !== 'production') {
  prisma = new PrismaClient({
    log: ['query', 'info', 'error', 'warn'],
  });
} else {
  prisma = new PrismaClient();
}

export default prisma;
