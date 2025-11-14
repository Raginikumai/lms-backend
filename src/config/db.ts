import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log("Connected to PostgreSQL via Prisma"))
  .catch((err: unknown) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

export default prisma;
