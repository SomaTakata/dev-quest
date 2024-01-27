"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2, Square, Trash2 } from "lucide-react";
import { useState } from "react";

type ButtonState = "available" | "loading" | "completed";
type ButtonProperties = {
  [state in ButtonState]: {
    text: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };
};
const buttonProperties: ButtonProperties = {
  available: {
    text: "質問を深掘する",
  },
  loading: {
    text: "深掘中",
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
  const [buttonState, setButtonState] = useState<ButtonState>("available");

  return (
    <Card className=" h-[178px] px-6 py-8 rounded-sm">
      <div className="flex">
        <Square size={24} className="" />
        <div className="grow mx-6 text-lg font-semibold leading-6">
          <p>
            問1)
            MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください
            <br />
            (500文字以内)*
          </p>
          <Button
            className="mt-6 w-full text-lg font-semibold bg-primary"
            disabled={buttonProperties[buttonState].disabled}
            onClick={() => {
              setButtonState("loading");
              setTimeout(() => {
                setButtonState("completed");
              }, 3000);
            }}
          >
            {buttonProperties[buttonState].icon}
            {buttonProperties[buttonState].text}
          </Button>
        </div>
        <Trash2 size={24} className="text-muted" />
      </div>
    </Card>
  );
};

export default QuestionCard;
