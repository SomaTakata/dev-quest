import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const questionRouter = router({
  all: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(({ input }) => {
      // 古い順に並べる
      return prisma.question.findMany({
        where: {
          projectId: input.projectId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  add: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return prisma.question.create({
        data: {
          content: input.content,
          projectId: input.projectId,
          answer: "",
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return prisma.question.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
