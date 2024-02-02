"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionAccordionItem from "./QuestionAccordionItem";
import type { SubQuestionGroup } from "./QuestionAccordionItem";

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
const QuestionCard = (props: QuestionCardProps) => {
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async () => {
    console.log("start");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: { question },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResponse(data);
      setErrorMessage("");
      console.log(response);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-between w-full gap-4 items-center">
            <Checkbox className="border-secondary mt-1" />
            <Textarea
              disabled={isCompleted}
              className={`bg-inherit focus:border-none font-bold  ${isCompleted ? "border-none text-xl" : ""} `}
              placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
              value={props.inputValue}
              onChange={(e) => setQuestion(e.target.value)}
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
                      createSubQuestions([
                        "なぜあなたはインターンに参加したいのですか？",
                        "なぜあなたはインターンに参加したいのですか？",
                        "なぜあなたはインターンに参加したいのですか？",
                      ]);
                      setCardState("dug");
                      setIsCompleted(true);
                    }, 500);
                  }, 3000);
                }}
              >
                {buttonProperties[buttonState].icon}
                {buttonProperties[buttonState].text}
              </Button>
              <Button onClick={() => handleSubmit()}>aaa</Button>
            </div>
            <div className={cardState === "dug" ? "" : "hidden"}>
              <p className="mt-4 text-base mb-4 font-bold text-[#BEBEC1]">
                以下の3つから回答したい質問を選択してください。
              </p>
              <Accordion type="multiple">
                {props.children.map((group, index) => {
                  const setSubQuestions = (value: SubQuestionGroup) => {
                    const newSubQuestions: SubQuestionGroup[] = [
                      ...props.children,
                    ];
                    newSubQuestions[index] = value;

                    const newQuestionItem: Question = {
                      ...props,
                      children: newSubQuestions,
                    };
                    props.setQuestionitem(newQuestionItem);
                  };

                  return (
                    <QuestionAccordionItem
                      value={`item-${index}`}
                      key={index}
                      items={group.items}
                      setSubQuestions={setSubQuestions}
                    />
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
