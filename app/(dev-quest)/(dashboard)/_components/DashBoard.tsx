import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CardModal } from "./CardModal";
import { Project } from "@prisma/client";

type Props = {
  projects: Project[];
};

const DashBoard = ({ projects }: Props) => {
  return (
    <div className="px-16 mt-10">
      <div className="flex flex-row justify-between items-center mb-8">
        <div className="">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <WelcomeMessage />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <PlusCircle size={36} />
          </DialogTrigger>
          <CardModal />
        </Dialog>
      </div>
      <div className="flex flex-column flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="gap-3 w-[300px] h-[220px] p-6 border-[3px] bg-inherit border-[#BEBEC1] flex flex-col justify-center items-center">
              <p className="text-[#BEBEC1] text-xl font-bold">新しく作成する</p>
              <PlusCircle className="text-[#BEBEC1]" size={36} />
            </Card>
          </DialogTrigger>
          <CardModal />
        </Dialog>
      </div>
    </div>
  );
};

export default DashBoard;

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="w-[300px] h-[220px] p-3">
      <div className="flex justify-end">
        <MoreHorizontal size={22} className="text-[#8F8F8F] mr-2" />
      </div>
      <div className="px-6 space-y-2">
        <p className=" font-bold text-xl">{project.companyName}</p>
        <div className="flex flex-col mt-1">
          <p className="text-accent-foreground text-sm font-semibold">期限</p>
          <p className="text-[#8F8F8F] font-xs font-semibold">
            {new Date(project.deadline).toLocaleDateString("ja-JP")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-accent-foreground text-sm font-semibold">進捗</p>
          <Progress value={33} />
        </div>
        <div className="text-right space-x-2 pt-3">
          <span className="text-accent-foreground text-sm font-semibold ">
            作成日
          </span>
          <span className="text-[#8F8F8F] font-semibold">
            {new Date(project.createdAt).toLocaleDateString("ja-JP")}
          </span>
        </div>
      </div>
    </Card>
  );
};
