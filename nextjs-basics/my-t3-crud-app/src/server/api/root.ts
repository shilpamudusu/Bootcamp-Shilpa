// ~/server/api/root.ts

import { appRouter } from './appRouter';  // Import the appRouter from the new file
import { initTRPC } from '@trpc/server';

// Initialize TRPC
const t = initTRPC.create();

// Export the appRouter to be used elsewhere in the app
export const createCaller = t.createCaller(appRouter);  // Create the caller using the appRouter

export type AppRouter = typeof appRouter;
