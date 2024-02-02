"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Props = {
  value: string;
};

const QuestionAccordionItem = (props: Props) => {
  return (
    <AccordionItem
      value={props.value}
      className="bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100"
    >
      <AccordionTrigger className="font-medium">あああ</AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          <Separator className="mt-8" />
          <p className="font-medium mt-6 mb-4 ml-3">質問文が入ります</p>
          <Textarea
            className={`bg-[#FFFFFF] text-secondary py-2`}
            placeholder="回答を記入してください"
          />

          <div className="flex justify-end mt-4">
            <Button className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground">
              深掘る
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionAccordionItem;
