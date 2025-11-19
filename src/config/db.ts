import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => logger.info('Connected to PostgreSQL via Prisma'))
  .catch((err: any) => {
    logger.error('❌ Database connection failed:', err);
    process.exit(1);
  });

export default prisma;
