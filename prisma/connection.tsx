import { PrismaClient } from "@prisma/client";

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // Prevent reinitializing in dev (hot reloads)
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Reuse existing or create new Prisma client
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
