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
import { Separator } from "@/components/ui/separator";

type ButtonStateType = "available" | "loading" | "completed";
type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};
type QuestionItem = {
  question: string;
  inputValue: string;
  locked?: boolean;
};
export type QuestionAccordionItemProps = {
  value: string;
};

const buttonProperties: ButtonProperties = {
  available: {
    text: "深掘る",
  },
  loading: {
    text: "深掘り中",
    disabled: true,
    icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
  },
  completed: {
    text: "深堀り完了",
    disabled: true,
    icon: <Check className="mr-2 h-4 w-4" />,
  },
};

const QuestionAccordionItem = (props: QuestionAccordionItemProps) => {
  const [questionItems, setQuestionItems] = useState<QuestionItem[]>([
    {
      question: "なぜあなたはインターンに参加したいのですか？",
      inputValue: "",
    },
  ]);
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");

  const handleChangeInputValue = (index: number, value: string) => {
    const newQuestionItems = [...questionItems];
    newQuestionItems[index] = { ...newQuestionItems[index], inputValue: value };

    setQuestionItems(newQuestionItems);
  };

  const handleNewQuestion = (question: string) => {
    const newQuestionItems = [...questionItems, { question, inputValue: "" }];

    setQuestionItems(newQuestionItems);
  };

  return (
    <AccordionItem
      value={props.value}
      className={cn(
        "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100",
        questionItems[0].inputValue.length > 0 ? "" : "opacity-60",
      )}
    >
      <AccordionTrigger className="font-medium">
        なぜあなたはインターンに参加したいのですか？
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          {questionItems.map((item, index) => {
            const isDisabled = item.locked || questionItems.length - index > 1;
            const separator = (
              <>
                <Separator className="mt-8" />
                <p className="font-medium mt-6 mb-4 ml-3">{item.question}</p>
              </>
            );

            return (
              <>
                {index > 0 ? separator : <></>}
                <Textarea
                  className={`bg-[#FFFFFF] text-secondary py-2`}
                  placeholder="回答を記入してください"
                  value={item.inputValue}
                  onChange={
                    isDisabled
                      ? () => {}
                      : (e) => handleChangeInputValue(index, e.target.value)
                  }
                  disabled={isDisabled}
                />
              </>
            );
          })}

          <div className="flex justify-end mt-4">
            <Button
              className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
              disabled={
                questionItems[questionItems.length - 1].inputValue.length ===
                  0 || buttonProperties[buttonState].disabled
              }
              onClick={() => {
                setButtonState("loading");
                questionItems[questionItems.length - 1].locked = true;

                setTimeout(() => {
                  setButtonState("completed");

                  setTimeout(() => {
                    handleNewQuestion(
                      "なぜあなたはインターンに参加したいのですか？",
                    );
                    setButtonState("available");
                  }, 1000);
                }, 3000);
              }}
            >
              {buttonProperties[buttonState].icon}
              {buttonProperties[buttonState].text}
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionAccordionItem;
