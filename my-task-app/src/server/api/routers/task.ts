import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  add: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: { title: input.title },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});

