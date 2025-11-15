import dotenv from 'dotenv';
dotenv.config();

// console.log("ACTUAL DB URL IN SERVER =>", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing!');
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing!');

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: Number(process.env.PORT) || 5000,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
