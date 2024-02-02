import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HistoryCard from "./HistoryCard";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export async function History() {
  const prisma = new PrismaClient();
  const project = await prisma.project.findMany();
  const question = await prisma.question.findMany();
  return (
    <div className="px-16 mt-10 mb-10">
      <div className="flex flex-col justify-between items-center ">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="font-bold text-3xl">History</h1>
          <div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="フィルター" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="favorites">お気に入り</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {question.map((item) => {
            const companyName = project.filter(
              (projectItem) => projectItem.id === item.projectId,
            )[0].companyName;

            return (
              <Link href={`/dashboard/${item.projectId}`}>
                <HistoryCard
                  company={companyName}
                  date={item.createdAt.toLocaleString()}
                  important={true}
                  question={item.content}
                  body="_" // TODO: 質問文を表示させる
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
