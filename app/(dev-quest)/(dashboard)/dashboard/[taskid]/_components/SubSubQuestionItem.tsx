import { SubSubQuestion } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  subSubQuestion: SubSubQuestion;
};

const SubSubQuestionItem = ({ subSubQuestion }: Props) => {
  const [answer, setAnswer] = useState<string>(
    subSubQuestion.answerContent || "",
  );

  return (
    <div key={subSubQuestion.id}>
      <Textarea
        className={`bg-[#FFFFFF] text-secondary py-2`}
        placeholder="回答を記入してください"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
};

export default SubSubQuestionItem;
