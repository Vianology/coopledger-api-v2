import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const prismaClient = globalForPrisma.prisma ?? new PrismaClient({
  log: ["error", "warn"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;

// Alias pour éviter de réécrire tous les contrôleurs (prisma.user -> prismaClient.user)
export const prisma = prismaClient as any;
prisma.user = prismaClient.user;
prisma.account = prismaClient.account;
prisma.session = prismaClient.session;
prisma.verification = prismaClient.verification;
prisma.cooperative = prismaClient.cooperative;
prisma.membership = prismaClient.membership;
prisma.transaction = prismaClient.transaction;
prisma.vote = prismaClient.vote;
prisma.voteCast = prismaClient.voteCast;