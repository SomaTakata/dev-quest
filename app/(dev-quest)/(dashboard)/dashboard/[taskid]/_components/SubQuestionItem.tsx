"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { clientApi } from "@/app/(dev-quest)/_trpc/client-api";
import { SubQuestion } from "@prisma/client";
import SubSubQuestionItem from "./SubSubQuestionItem";

type Props = {
  subQuestion: SubQuestion;
};

const SubQuestionItem = ({ subQuestion }: Props) => {
  const subSubQuestions = clientApi.subSubQuestion.all.useQuery({
    subQuestionId: subQuestion.id,
  });

  if (!subSubQuestions.data || !subSubQuestions.data[0]) {
    return <div>Loading...</div>;
  }

  return (
    <AccordionItem
      value={subQuestion.id}
      className="bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100"
    >
      <AccordionTrigger className="font-medium">
        {subSubQuestions.data[0].questionContent}
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-4 ">
          {subSubQuestions.data.map((item, index) => (
            <div key={item.id}>
              {/* SubSubQuestion が複数あったときにはセパレータを表示する */}
              {index > 0 ? (
                <SubSubSeparator questionContent={item.questionContent} />
              ) : (
                <></>
              )}
              <SubSubQuestionItem subSubQuestion={item} />
            </div>
          ))}

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

export default SubQuestionItem;

type SubSubSeparatorProps = {
  questionContent: string;
};

const SubSubSeparator = ({ questionContent }: SubSubSeparatorProps) => {
  return (
    <>
      <Separator className="mt-8" />
      <p className="font-medium mt-6 mb-4 ml-3">{questionContent}</p>
    </>
  );
};
