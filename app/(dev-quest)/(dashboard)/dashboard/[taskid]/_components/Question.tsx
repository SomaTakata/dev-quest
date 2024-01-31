
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import React from 'react'

const Question = () => {
  return (
    <div><div className="flex justify-between w-full gap-4 items-center">
    <Checkbox className="border-secondary mt-1" />
    <Textarea
      disabled={isCompleted}
      className={`bg-inherit focus:border-none font-bold  ${isCompleted ? "border-none text-xl" : ""} `}
      placeholder="質問を入力してください。例 : 問1)MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください (500文字以内)"
      value={props.inputValue}
      onChange={(e) => setInputValue(e.target.value)}
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
    </div></div>
  )
}

export default Question