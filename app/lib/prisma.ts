import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma client to avoid exhausting connections in development
declare global {
  var __prismaClient__: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.__prismaClient__ ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prismaClient__ = prisma;
}
