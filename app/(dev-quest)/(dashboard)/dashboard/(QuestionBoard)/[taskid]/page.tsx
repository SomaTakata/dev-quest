import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";
import ProjectContent from "./_components/ProjectContent";

type Props = {
  params: {
    taskid: string;
  };
};

const taskHome = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: params.taskid },
  });

  if (!project) {
    return notFound();
  }

  return <ProjectContent project={project} />;
};

export default taskHome;
