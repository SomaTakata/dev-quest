"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Square, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionAccordionItem from "./QuestionAccordionItem";

type ButtonStateType = "available" | "loading" | "completed";
type CardStateType = "indeterminate" | "dug";
type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};

const QuestionCard = () => {
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);

  console.log(inputValue);
  console.log(isActive);
  console.log(isCompleted);
  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-between w-full gap-4 items-center">
            <Checkbox className="border-secondary mt-1" />
            <Textarea
              readOnly={isCompleted}
              className={`bg-inherit focus:border-none font-bold  ${isCompleted ? "border-none text-xl" : ""} `}
              placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Trash2 size={24} className="text-muted" />
          </div>
          <div className="px-8">
            <div className={cardState === "indeterminate" ? "" : "hidden"}>
              <Button
                className={`mt-6 w-full text-base  bg-primary py-6`}
                disabled={buttonProperties[buttonState].disabled}
                onClick={() => {
                  setButtonState("loading");
                  setTimeout(() => {
                    setButtonState("completed");

                    setTimeout(() => {
                      setCardState("dug");
                      setIsCompleted(true);
                    }, 500);
                  }, 3000);
                }}
              >
                {buttonProperties[buttonState].icon}
                {buttonProperties[buttonState].text}
              </Button>
            </div>
            <div className={cardState === "dug" ? "" : "hidden"}>
              <p className="mt-4 text-lg mb-4 font-bold text-[#BEBEC1]">
                以下の3つから回答したい質問を選択してください。
              </p>
              <Accordion type="multiple">
                <QuestionAccordionItem value="item-1" />
                <QuestionAccordionItem value="item-2" />
                <QuestionAccordionItem value="item-3" />
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
