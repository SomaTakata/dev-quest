import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const targetId: string = params.id;
  console.log(targetId);
  try {
    const createdProject = await prisma.project.delete({
      where: {
        id: targetId,
      },
    });

    return NextResponse.json(
      { message: "プロジェクトの消去に成功しました。", createdProject },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "プロジェクトの消去に失敗しました。" },
      { status: 500 },
    );
  }
}
