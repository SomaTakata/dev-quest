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
export type TextAreaProps = {
  id: string;
  questionContent: string;
  answerContent: string;
  locked: boolean;
  indexNumber: number;
};
const AccordionArea = ({
  indexNumber,
  id,
  locked,
  answerContent,
  questionContent,
}: TextAreaProps) => {
  const [inputValue, setInputValue] = useState(answerContent);
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [cardState, setCardState] = useState<CardStateType>("indeterminate");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);

  return (
    <div key={indexNumber}>
      {indexNumber > 0 ? separator : <></>}
      <Textarea
        className={`bg-[#FFFFFF] text-secondary py-2`}
        placeholder="回答を記入してください"
        value={inputValue}
        disabled={locked}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button
          className="w-36 font-bold text-primary-foreground hover:text-primary hover:bg-primary-foreground border border-primary-foreground"
          disabled={locked}
          onClick={() => {
            setButtonState("loading");
            setTimeout(() => {
              setButtonState("completed");
            }, 1000);
          }}
        >
          {" "}
          {buttonProperties[buttonState].icon}
          {buttonProperties[buttonState].text}
        </Button>
      </div>
    </div>
  );
};

export default AccordionArea;
