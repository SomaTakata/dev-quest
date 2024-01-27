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

type ButtonStateType = "available" | "loading" | "completed";
type CardStateType = "indeterminate" | "dug";
type ButtonProperties = {
  [state in ButtonStateType]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};
const buttonProperties: ButtonProperties = {
  available: {
    text: "質問を深掘る",
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

const QuestionCard = () => {
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);
  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-between w-full gap-4 items-center">
            <Checkbox className="border-secondary mt-1" />
            <Textarea
              className={`bg-inherit focus:border-none text-lg font-bold ${isActive ? "border-none " : ""}`}
              placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsActive(true)} // フォーカス時は常にborder-noneを適用
              onBlur={() => setIsActive(inputValue.length > 0)} // フォーカスが外れた時に入力があるかどうかを確認
            />
            <Trash2 size={24} className="text-muted" />
          </div>
          <div className="px-8">
            <div className={cardState === "indeterminate" ? "" : "hidden"}>
              <Button
                className="mt-6 w-full text-base  bg-primary"
                disabled={buttonProperties[buttonState].disabled}
                onClick={() => {
                  setButtonState("loading");
                  setTimeout(() => {
                    setButtonState("completed");

                    setTimeout(() => {
                      setCardState("dug");
                    }, 1000);
                  }, 3000);
                }}
              >
                {buttonProperties[buttonState].icon}
                {buttonProperties[buttonState].text}
              </Button>
            </div>
            <div className={cardState === "dug" ? "" : "hidden"}>
              <p className="mt-6 text-lg mb-4 font-bold text-[#BEBEC1]">
                以下の3つから回答したい質問を選択してください。
              </p>
              <Accordion type="multiple">
                <AccordionItem
                  value="item-1"
                  className="bg-primary text-primary-foreground"
                >
                  <AccordionTrigger className="font-medium ">
                    なぜあなたはインターンに参加したいのですか？
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 ">
                      <Textarea
                        className={`bg-[#FFFFFF] text-secondary py-2`}
                        placeholder="回答を記入してください"
                        //中身のvalueをstateで持つ
                      />
                      <div className="flex justify-end mt-4">
                        <Button className="px-12 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground">
                          深掘る
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="bg-primary text-primary-foreground"
                >
                  <AccordionTrigger className="font-medium">
                    なぜあなたはインターンに参加したいのですか？
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4">
                      <Textarea
                        className={`bg-[#FFFFFF] text-secondary py-2`}
                        placeholder="回答を記入してください"
                        //中身のvalueをstateで持つ
                      />
                      <div className="flex justify-end mt-4">
                        <Button className="px-12 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground">
                          深掘る
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="bg-primary text-primary-foreground"
                >
                  <AccordionTrigger className="font-medium">
                    なぜあなたはインターンに参加したいのですか？
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 ">
                      <Textarea
                        className={`bg-[#FFFFFF] text-secondary py-2`}
                        placeholder="回答を記入してください"
                        //中身のvalueをstateで持つ
                      />
                      <div className="flex justify-end mt-4">
                        <Button className="px-12 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border-2 border-primary-foreground">
                          深掘る
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
