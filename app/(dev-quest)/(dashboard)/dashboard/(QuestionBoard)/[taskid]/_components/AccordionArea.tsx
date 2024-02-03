import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  ButtonProperties,
  ButtonStateType,
  CardStateType,
} from "./QuestionAccordionItem";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2 } from "lucide-react";
import { clientApi } from "@/app/(dev-quest)/_trpc/client-api";

export type TextAreaProps = {
  id: string;
  questionContent: string;
  answerContent: string;
  locked: boolean;
  indexNumber: number;
  level: number;
};

const AccordionArea = ({
  indexNumber,
  id,
  level,
  locked,
  answerContent,
  questionContent,
}: TextAreaProps) => {
  const [inputValue, setInputValue] = useState(answerContent);
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);

  const patchSubSubQuestion = (id: string, answer: string) => {
    // clientApi.subSubQuestion.patch.useMutation().mutate({
    //   subQuestionId: id,
    //   answerContent: answer,
    // });
  };

  const handleSubmit = async () => {
    setButtonState("loading");

    // データベース内の回答を更新
    await patchSubSubQuestion(id, inputValue);

    // OPEN APIにリクエストを送信
    try {
      const response = await fetch("/api/openapi-endpoint", {
        // OPENAPIのエンドポイントを指定
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionContent,
          answer: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed.");
      }

      const data = await response.json();

      // 帰ってきた質問をsubSubQuestionに追加
      if (data && data.newQuestion) {
        // await addSubSubQuestion(id, data.newQuestion);
      }

      setButtonState("completed");
      setCardState("dug");
    } catch (error) {
      console.error("API call error:", error);
      setButtonState("available"); // エラーが発生した場合はボタンの状態を元に戻す
    }
  };

  const separator = (
    <>
      <Separator className="mt-8" />
      <p className="font-medium mt-6 mb-4 ml-3">{questionContent}</p>
    </>
  );

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

  return (
    <div key={indexNumber}>
      {indexNumber > 0 ? separator : null}
      <Textarea
        className="bg-[#FFFFFF] text-secondary py-2"
        placeholder="回答を記入してください"
        value={inputValue}
        disabled={locked}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button
          className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
          disabled={buttonProperties[buttonState].disabled}
          onClick={handleSubmit}
        >
          {buttonProperties[buttonState].icon}
          {buttonProperties[buttonState].text}
        </Button>
      </div>
    </div>
  );
};

export default AccordionArea;
