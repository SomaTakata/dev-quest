import { prisma } from "@/lib/prisma";
import QuestionPage from "./_components/QuestionPage";
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

  return <QuestionPage project={project} />;
};

export default taskHome;
