// prisma.config.ts 

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // 1. This tells Prisma where to find your schema files.
  schema: 'prisma',

  // 2. This explicitly tells Prisma how to connect to the database.
  datasource: { 
    url: env("DATABASE_URL") 
  }
});