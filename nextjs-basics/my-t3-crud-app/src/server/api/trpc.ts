// ~/server/api/trpc.ts
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { prisma } from '~/server/db';  // Assuming you have a db.ts for Prisma

const t = initTRPC.create();

// Define the context type
export const createTRPCContext = ({ headers }: { headers: Headers }) => {
  return { prisma, headers };
};

export type CreateContextOptions = inferAsyncReturnType<typeof createTRPCContext>;
