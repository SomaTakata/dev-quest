import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const subSubQuestionRouter = router({
  all: publicProcedure
    .input(
      z.object({
        subQuestionId: z.string(),
      }),
    )
    .query(({ input }) => {
      // 古い順に並べる
      return prisma.subSubQuestion.findMany({
        where: {
          subQuestionId: input.subQuestionId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  add: publicProcedure
    .input(
      z.object({
        subQuestionId: z.string(),
        questionContent: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return prisma.subSubQuestion.create({
        data: {
          subQuestionId: input.subQuestionId,
          questionContent: input.questionContent,
          answerContent: "",
          level: 0,
        },
      });
    }),
});
