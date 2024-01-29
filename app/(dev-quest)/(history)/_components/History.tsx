import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HistoryCard from "./HistoryCard";

const History = () => {
  return (
    <div className="px-16 mt-10 mb-10">
      <div className="flex flex-col justify-between items-center ">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="font-bold text-3xl">History</h1>
          <div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="フィルター" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="favorites">お気に入り</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
          <HistoryCard
            company="株式会社MIXI"
            date="2024/01/16 at 1:25AM"
            important={true}
            question="なぜあなたはインターンに参加したいのですか？"
            body="フロントエンド開発の知識を深めたいと考えています。特に、Reactを使用したプロジェクトに携わりたいです。"
          />
        </div>
      </div>
    </div>
  );
};

export default History;
