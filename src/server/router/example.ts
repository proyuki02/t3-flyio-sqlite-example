import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("countup", {
    async resolve({ ctx }) {
      const pv = await ctx.prisma.counter.upsert({
        where: { id: 'pv' },
        create: { id: 'pv', count: 0 },
        update: { count: {increment: 1}},
      });
      return pv.count;
    },
  })
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
