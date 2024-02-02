"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SubQuestionItem from "./SubQuestionItem";
import type { SubQuestionGroup } from "./SubQuestionItem";
import { Question } from "@prisma/client";
import { clientApi } from "@/app/(dev-quest)/_trpc/client-api";

export type QuestionCardProps = {
  question: Question;
};
const QuestionCard = ({ question }: QuestionCardProps) => {
  const [questionText, setQuestionText] = useState<string>(question.content);

  const subQuestions = clientApi.subQuestion.all.useQuery({
    questionId: question.id,
  });

  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-between w-full gap-4 items-center">
            <Checkbox className="border-secondary mt-1" />
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className={"bg-inherit focus:border-none font-bold"}
              placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
            />
            <Trash2 size={24} className="text-muted" />
          </div>
          <div className="px-8">
            {/* 深掘りするボタン、SubQuestion を生成したら消す */}
            <div className="hidden">
              <Button className="mt-6 w-full text-base bg-primary py-6">
                深掘りする
              </Button>
            </div>

            {/* SubQuestion の一覧 */}
            <div>
              <p className="mt-4 text-base mb-4 font-bold text-[#BEBEC1]">
                以下の3つから回答したい質問を選択してください。
              </p>
              <Accordion type="multiple">
                {subQuestions.data
                  ? subQuestions.data.map((item) => (
                      <SubQuestionItem key={item.id} subQuestion={item} />
                    ))
                  : "Loading..."}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
