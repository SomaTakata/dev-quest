"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionAccordionItem from "../../../_components/QuestionAccordionItem";
import type { SubQuestionGroup } from "../../../_components/QuestionAccordionItem";
import SubQuestion from "./SubQuestion";

type ButtonStateType = "available" | "loading" | "completed";
type CardStateType = "indeterminate" | "dug";
type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};
export type Question = {
  id?: string;
  inputValue: string;
  children: SubQuestionGroup[];
};
export type QuestionCardProps = Question & {
  setQuestionitem: (value: Question) => void;
};
const QuestionBoard = (props: QuestionCardProps) => {
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const buttonProperties: ButtonProperties = {
    available: {
      text: "質問を深掘る",
      disabled: !isActive,
    },
    loading: {
      text: "深掘り中",
      disabled: true,
      icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
    },
    completed: {
      text: "深堀完了",
      disabled: true,
      icon: <Check className="mr-2 h-4 w-4" />,
    },
  };

  const setInputValue = (value: string) => {
    const newQuestionItem: Question = { ...props, inputValue: value };
    props.setQuestionitem(newQuestionItem);
  };

  const createSubQuestions = (questions: string[]) => {
    const newQuestionItem: Question = { ...props };
    for (const question of questions) {
      const newSubQuestion: SubQuestionGroup = {
        items: [
          {
            question,
            inputValue: "",
          },
        ],
      };
      newQuestionItem.children = [...newQuestionItem.children, newSubQuestion];
    }
    props.setQuestionitem(newQuestionItem);
  };

  useEffect(() => {
    setIsActive(props.inputValue.length > 0);
  }, [props.inputValue]);

  console.log(props.inputValue);
  console.log(isActive);
  console.log(isCompleted);
  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <div className="w-full">
          <Question/>
            <SubQuestion />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionBoard;
