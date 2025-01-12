import { taskRouter } from "~/server/api/routers/task";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;


