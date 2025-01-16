import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize TRPC
const t = initTRPC.create();

// Create task router
export const taskRouter = t.router({
  // Query to get all tasks
  getAll: t.procedure.query(() => {
    return [];  // Example: return some task data
  }),

  // Mutation to create a new task
  create: t.procedure
    .input(z.object({
      title: z.string().min(1),  // Add input validation
    }))
    .mutation(async ({ input }) => {
      return { title: input.title };  // Example task creation logic
    }),
});
