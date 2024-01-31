"use client";
import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CardModal } from "./CardModal";
import { Project } from "@prisma/client";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

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
          <Link key={project.id} href={`/dashboard/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
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
