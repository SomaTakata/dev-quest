"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";
import { clientApi } from "@/app/(dev-quest)/_trpc/client-api";
import { Separator } from "@/components/ui/separator";
import AccordionTextArea from "./AccordionArea";
import AccordionArea from "./AccordionArea";

export type ButtonStateType = "available" | "loading" | "completed";
export type CardStateType = "indeterminate" | "dug";
export type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};
export type SubQuestion = {
  id?: string;
  question: string;
  inputValue: string;
  locked: boolean;
};
export type SubSubQuestion = {
  subQuestionId: string;
  id: string;
  locked: boolean;
  createdAt: string;
  questionContent: string;
  answerContent: string;
  important: boolean;
  level: number;
};

type Props = {
  subQuestionId: string;
};

const QuestionAccordionItem = ({ subQuestionId }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const subSubQuestions = clientApi.subSubQuestion.all.useQuery({
    subQuestionId,
  });

  if (!subSubQuestions.data) {
    return <div>Loading...</div>;
  }

  const items = subSubQuestions.data;

  return (
    <AccordionItem
      value={subSubQuestions.data[0].questionContent}
      className={cn(
        "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100",
        items[0].locked ? "" : "opacity-60",
      )}
    >
      <AccordionTrigger className="font-medium">
        {items[0].questionContent}
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          {subSubQuestions.data?.map((item, index) => {
            // const isDisabled = item.locked || props.items.length - index > 1;

            return (
              <AccordionArea
                key={index}
                answerContent={item.answerContent}
                id={item.id}
                locked={item.locked}
                index={index}
                questionContent={item.questionContent}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionAccordionItem;
