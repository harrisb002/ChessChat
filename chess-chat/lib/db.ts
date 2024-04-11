import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

// GlobalThis is not effected by hot reload so its perfect for production
if (process.env.NODE_ENV !== "production") globalThis.prisma = db