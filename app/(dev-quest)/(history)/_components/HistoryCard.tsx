import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface HistoryCardProps {
  company: string;
  date: string;
  important: boolean;
  question: string;
  body: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  company,
  date,
  important,
  question,
  body,
}) => {
  return (
    <Card className="px-12 py-8">
      <div className="flex justify-between mb-3">
        <p className="text-lg font-bold">{question}</p>
        {important && <Star className="text-yellow-500" />}
      </div>
      <p className="pr-6">{body}</p>
      <div className="flex gap-2 justify-end mt-3 pr-6">
        <p className="text-base font-bold">{company}</p>
        <p className="text-base text-[#BEBEC1]">{date}</p>
      </div>
    </Card>
  );
};

export default HistoryCard;
