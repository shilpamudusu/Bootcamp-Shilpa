// ~/server/api/appRouter.ts

import { initTRPC } from '@trpc/server';

// Initialize TRPC
const t = initTRPC.create();

// Define your routers here (taskRouter, etc.)
export const taskRouter = t.router({
  // Define a simple route for example
  getAll: t.procedure.query(() => {
    return [{ id: 1, title: 'Task 1' }];
  }),
});

export const appRouter = t.router({
  task: taskRouter,  // Add your routers here
});

export type AppRouter = typeof appRouter;
