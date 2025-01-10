import { z } from 'zod';
import { prisma } from '../db';
import { router, procedure } from '@trpc/server';

export const taskRouter = router({
  list: procedure.query(async () => {
    return prisma.task.findMany();
  }),
  add: procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return prisma.task.create({
        data: { title: input.title },
      });
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
