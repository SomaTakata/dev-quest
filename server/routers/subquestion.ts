import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const subQuestionRouter = router({
  all: publicProcedure
    .input(
      z.object({
        questionId: z.string(),
      }),
    )
    .query(({ input }) => {
      // 古い順に並べる
      return prisma.subQuestion.findMany({
        where: {
          questionId: input.questionId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  add: publicProcedure
    .input(
      z.object({
        questionId: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return prisma.subQuestion.create({
        data: {
          questionId: input.questionId,
        },
      });
    }),
});
