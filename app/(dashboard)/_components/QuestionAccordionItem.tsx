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
export type SubQuestion = {
  id?: string;
  question: string;
  inputValue: string;
  locked?: boolean;
};
export type SubQuestionGroup = {
  items: SubQuestion[];
};
export type QuestionAccordionItemProps = {
  value: string;
  items: SubQuestion[];
  setSubQuestions: (value: SubQuestionGroup) => void;
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
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");

  const handleChangeInputValue = (index: number, value: string) => {
    const newQuestionItems = [...props.items];
    newQuestionItems[index] = { ...newQuestionItems[index], inputValue: value };

    props.setSubQuestions({ items: newQuestionItems });
  };

  const handleNewQuestion = (question: string) => {
    const newQuestionItems = [...props.items, { question, inputValue: "" }];

    props.setSubQuestions({ items: newQuestionItems });
  };

  return (
    <AccordionItem
      value={props.value}
      className={cn(
        "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100",
        props.items[0].inputValue.length > 0 ? "" : "opacity-60",
      )}
    >
      <AccordionTrigger className="font-medium">
        {props.items[0].question}
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          {props.items.map((item, index) => {
            const isDisabled = item.locked || props.items.length - index > 1;
            const separator = (
              <>
                <Separator className="mt-8" />
                <p className="font-medium mt-6 mb-4 ml-3">{item.question}</p>
              </>
            );

            return (
              <div key={index}>
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
              </div>
            );
          })}

          <div className="flex justify-end mt-4">
            <Button
              className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
              disabled={
                props.items[props.items.length - 1].inputValue.length === 0 ||
                buttonProperties[buttonState].disabled
              }
              onClick={() => {
                setButtonState("loading");
                props.items[props.items.length - 1].locked = true;

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
