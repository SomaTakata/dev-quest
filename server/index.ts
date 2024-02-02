import { router } from "./trpc";
import { questionRouter } from "./routers/question";
import { subQuestionRouter } from "./routers/subquestion";
import { subSubQuestionRouter } from "./routers/subsubquestion";

export const appRouter = router({
  question: questionRouter,
  subQuestion: subQuestionRouter,
  subSubQuestion: subSubQuestionRouter,
});

export type AppRouter = typeof appRouter;
