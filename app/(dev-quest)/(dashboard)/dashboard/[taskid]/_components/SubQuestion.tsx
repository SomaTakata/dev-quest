import React from "react";
import QuestionAccordionItem from "./SubSubQuestion";
import { Accordion } from "@/components/ui/accordion";
import SubSubQuestion from "./SubSubQuestion";

const SubQuestion = () => {
  return (
    <div className={cardState === "dug" ? "" : "hidden"}>
      <p className="mt-4 text-base mb-4 font-bold text-[#BEBEC1]">
        以下の3つから回答したい質問を選択してください。
      </p>
      <Accordion type="multiple">
        {props.children.map((group, index) => {
          const setSubQuestions = (value: SubQuestionGroup) => {
            const newSubQuestions: SubQuestionGroup[] = [...props.children];
            newSubQuestions[index] = value;

            const newQuestionItem: Question = {
              ...props,
              children: newSubQuestions,
            };
            props.setQuestionitem(newQuestionItem);
          };

          return (
            <SubSubQuestion
              value={`item-${index}`}
              key={index}
              items={group.items}
              setSubQuestions={setSubQuestions}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default SubQuestion;
