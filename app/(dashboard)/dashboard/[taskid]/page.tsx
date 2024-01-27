import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import React from "react";

const taskHome = () => {
  return (
    <div className="px-16">
      <div className="flex justify-end mt-8">
        <div className="flex mr-20 gap-4 items-center">
          <p className="text-accent-foreground text-sm font-semibold">期限</p>
          <p className="text-[#8F8F8F] font-xs font-semibold">2023/02/16</p>
        </div>
        <X size={36} />
      </div>
      <div className="flex flex-row justify-between items-center mb-6 mt-6">
        <h1 className="font-bold text-3xl underline ">株式会社MIXI</h1>
      </div>
      <div className="flex gap-8 items-center w-full">
        <p className=" text-sm font-bold text-accent-foreground text-nowrap">
          進捗
        </p>
        <Progress value={33} className="grow" />
        <p className="font-bold text-[#BEBEC1]">33%</p>
      </div>

      <div className="px-4 w-full flex justify-center">
        <div className="mt-10 w-full max-w-[1080px]">
          <p className=" text-xl font-bold mb-2">質問</p>
          <Card className=" h-[220px] p-3 rounded-sm"></Card>
        </div>
      </div>
    </div>
  );
};

export default taskHome;
