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
import { clientApi } from "@/app/(dev-quest)/_trpc/client-api";

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
// export type QuestionCardProps = Question & {
//   setQuestionitem: (value: Question) => void;
// };

type Props = {
  questionId: string;
  content: string;
  locked: boolean;
};

const QuestionCard = ({ questionId, content, locked }: Props) => {
  const [inputValue, setInputValue] = useState(content);
  const [answerValue, setAnswerValue] = useState("");
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>(
    locked ? "dug" : "indeterminate",
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const subMutation = clientApi.subQuestion.add.useMutation();
  const subSubMutation = clientApi.subSubQuestion.add.useMutation();
  const questionMutation = clientApi.question.delete.useMutation();

  const subQuestions = clientApi.subQuestion.all.useQuery({ questionId });

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

  // const setInputValue = (value: string) => {
  //   const newQuestionItem: Question = { ...props, inputValue: value };
  //   props.setQuestionitem(newQuestionItem);
  // };

  const createSubQuestions = async (questions: string[]) => {
    for (const question of questions) {
      const sub = await subMutation.mutateAsync({
        questionId,
      });

      subSubMutation.mutate({
        subQuestionId: sub.id,
        questionContent: question,
      });
    }
  };

  const deleteQuestion = (questionId: string) => {
    questionMutation.mutate({ id: questionId });
    location.reload();
  };

  const handleSubmit = async (question: string) => {
    setButtonState("loading");
    fetch(`/api/question/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: question,
        locked: true,
      }),
    }).then((e) => console.log(e));
    setButtonState("loading");
    setCardState("dug");
    console.log(question);
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          createSubQuestions(JSON.parse(data));
        })
        .then(() => {
          //props.inputValue を DB に追加
          fetch(`/api/question/${questionId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: inputValue,
            }),
          }).then((e) => console.log(e));
        })
        .then(() => setButtonState("completed"))
        .then(() => setCardState("dug"))
        .then(() => setIsCompleted(true));
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleGenerateAnswer = async () => {
    const generatedAnswer = await fetch(`/api/generateAnswer?id=${questionId}`);
    const generatedAnswerText = await generatedAnswer.json();

    setAnswerValue(generatedAnswerText);
  };

  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);

  console.log(isActive);
  console.log(locked);
  return (
    <Card className=" min-h-[178px] px-6 py-8 rounded-sm my-4">
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-between w-full gap-4 items-center">
            <Checkbox className="border-secondary mt-1" />
            <Textarea
              disabled={locked}
              className={`bg-inherit focus:border-none font-bold  ${locked ? "border-none text-xl" : ""} `}
              placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Trash2
              size={24}
              onClick={() => deleteQuestion(questionId)}
              className="text-muted"
            />
          </div>
          <div className="px-8">
            <div className={cardState === "indeterminate" ? "" : "hidden"}>
              <Button
                className={`mt-6 w-full text-base  bg-primary py-6`}
                disabled={buttonProperties[buttonState].disabled}
                onClick={() => {
                  handleSubmit(inputValue);
                }}
              >
                {buttonProperties[buttonState].icon}
                {buttonProperties[buttonState].text}
              </Button>
            </div>
            <div className={cardState === "dug" ? "" : "hidden"}>
              <p className="mt-4 text-base mb-4 font-bold text-[#BEBEC1]">
                以下の3つから回答したい質問を選択してください。
              </p>
              <Accordion type="multiple">
                {subQuestions.data
                  ? subQuestions.data.map((item) => (
                      <QuestionAccordionItem subQuestionId={item.id} />
                    ))
                  : "Loading..."}
              </Accordion>
              <div className="flex justify-end w-full mt-4">
                <Button
                  className="w-36 bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary"
                  onClick={handleGenerateAnswer}
                >
                  統合する
                </Button>
              </div>
              {answerValue ? (
                <Textarea
                  disabled
                  className="bg-[#FFFFFF] text-secondary py-2 mt-4"
                  value={answerValue}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
