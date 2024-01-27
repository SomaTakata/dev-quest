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

export type QuestionAccordionItemProps = {
  value: string;
};

const QuestionAccordionItem = (props: QuestionAccordionItemProps) => {
  const [inputValue, setInputValue] = useState("");

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
              className="px-12  font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
              disabled={inputValue.length === 0}
            >
              深掘る
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionAccordionItem;
