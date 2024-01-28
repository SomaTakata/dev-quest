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

type ButtonStateType = "available" | "loading" | "completed";
type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
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
  const [inputValue, setInputValue] = useState("");
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");

  return (
    <AccordionItem
      value={props.value}
      className={cn(
        "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100",
        inputValue.length > 0 ? "" : "opacity-60",
      )}
    >
      <AccordionTrigger className="font-medium">
        なぜあなたはインターンに参加したいのですか？
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          <Textarea
            className={`bg-[#FFFFFF] text-secondary py-2`}
            placeholder="回答を記入してください"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button
              className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
              disabled={
                inputValue.length === 0 ||
                buttonProperties[buttonState].disabled
              }
              onClick={() => {
                setButtonState("loading");
                setTimeout(() => {
                  setButtonState("completed");

                  setTimeout(() => {
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
