import { z } from "zod";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting1: publicProcedure.query((opts) => {
    return { msg: "Hello World" };
  }),
  greeting2: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => {
      return { msg: `Hello ${opts.input.name ?? "World"}` };
    }),
});

export type AppRouter = typeof appRouter;
