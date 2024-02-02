import { prisma } from "@/lib/prisma";
import ProjectContent from "./_components/ProjectContent";
import { notFound } from "next/navigation";

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

  // FIXME: ProjectContent 以下が完成しだい、戻す
  return <></>;
  // return <ProjectContent project={project} />;
};

export default taskHome;
