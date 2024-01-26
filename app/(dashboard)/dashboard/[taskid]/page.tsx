import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import React from "react";

const taskHome = () => {
  return (
    <div className="px-12 ">
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 items-center w-full">
          <p className=" text-sm font-bold text-accent-foreground">進捗</p>
          <Progress value={33} className="w-4/5" />
          <p className="font-bold text-[#BEBEC1]">33%</p>
        </div>
        <div className="flex mr-20 gap-4 items-center w-1/5">
          <p className="text-accent-foreground text-sm font-semibold">期限</p>
          <p className="text-[#8F8F8F] font-xs font-semibold">2023/02/16</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-6 mt-10">
        <h1 className="font-bold text-3xl underline ">株式会社MIXI</h1>
        <X size={36} />
      </div>

      <div className="flex flex-col mt-10">
        <p className=" text-xl font-bold mb-2">質問</p>
      </div>
      <Card className=" h-[220px] p-3 rounded-sm"></Card>
    </div>
  );
};

export default taskHome;
