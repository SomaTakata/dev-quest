import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Square, Trash2, X } from "lucide-react";
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
        <div className="mt-10 w-full max-w-[980px]">
          <p className=" text-xl font-bold mb-2">質問</p>
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
                  disabled
                >
                  質問を深掘する
                </Button>
              </div>
              <Trash2 size={24} className="text-muted" />
            </div>
          </Card>
          <Button className="mt-12 font-semibold text-md bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary">
            <Plus className="mr-2 h-4 w-4" />
            質問を追加
          </Button>
        </div>
      </div>
    </div>
  );
};

export default taskHome;
