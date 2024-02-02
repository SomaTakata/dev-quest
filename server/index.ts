import { router } from "./trpc";
import { questionRouter } from "./routers/question";

export const appRouter = router({
  question: questionRouter,
});

export type AppRouter = typeof appRouter;
