"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import QuestionCard, { Question } from "../../../_components/QuestionCard";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

const ProjectContent = ({ project }: Props) => {
  const router = useRouter();
  const [questionItems, setQuestionItems] = useState<Question[]>([
    {
      inputValue: "",
      children: [],
    },
  ]);

  return (
    <div className="px-16 py-4">
      <div className="flex justify-end ">
        <div className="flex  gap-4 items-center">
          <p className="text-accent-foreground text-sm font-semibold">期限</p>
          <p className="text-[#8F8F8F] font-xs font-semibold">
            {new Date(project.deadline).toLocaleDateString("ja-JP")}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-8 mt-6">
        <h1 className="font-bold text-3xl underline ">{project.companyName}</h1>
        <X
          size={36}
          onClick={() => {
            router.push("/dashboard");
          }}
        />
      </div>
      <div className="px-2  flex gap-8 items-center w-full">
        <p className=" text-sm font-bold text-accent-foreground text-nowrap">
          進捗
        </p>
        <Progress value={33} className="grow" />
        <p className="font-bold text-[#BEBEC1]">33%</p>
      </div>

      <div className="px- w-full flex justify-center">
        <div className="mt-10 w-full">
          <p className=" text-xl font-bold mb-2">質問</p>
          {questionItems.map((item, index) => {
            const setQuestionItem = (value: Question) => {
              const newQuestionItems = [...questionItems];
              newQuestionItems[index] = value;
              setQuestionItems(newQuestionItems);
            };

            return (
              <QuestionCard
                {...item}
                key={index}
                setQuestionitem={setQuestionItem}
              />
            );
          })}

          <div className="flex justify-start">
            <Button className="mt-6   bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary">
              <Plus className="mr-2 h-4 w-4" />
              質問を追加
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
