import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Project } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

function handleDelete(projectID: string) {
  // /api/project/[id] に DELETE
  fetch(`/api/project/${projectID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: projectID,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="w-[300px] h-[220px] p-4">
      <div className="flex justify-end">
        <MoreHorizontal
          size={22}
          className="text-[#8F8F8F] mr-2"
          onClick={() => handleDelete(project.id)}
        />
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

export default ProjectCard;
